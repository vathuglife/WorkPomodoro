using MediaToolkit;
using MediaToolkit.Model;
using Microsoft.AspNetCore.Mvc;
using System.Reflection.Metadata.Ecma335;
using VideoLibrary;
using WorkPomodoro_API.MusicAPI.DTO;
using static MediaToolkit.Model.Metadata;

namespace WorkPomodoro_API.Utilities
{
    public static class YTToMp3
    {
        /*this HttpContext context is actually called Extension Method.
         This means: We add another Method (GetMP3) to existing types (HttpContext). 
        To use it, just call: HttpContext.GetMP3*/
        private static long? totalProgress = 0;
        private static string msg = "";
        public static async Task GetProgress(this HttpContext ctx)
        {
            
            if (totalProgress < 100)
            {
                await ctx.Response.WriteAsync("data: Downloaded: " + totalProgress + "%\n");
              
            }
            else
            {
                await ctx.Response.WriteAsync("data: " + msg + "\n");
            }
            await ctx.Response.WriteAsync("\n");
            await ctx.Response.Body.FlushAsync();
        }

        

        public static async Task<string> GetMP3(string VideoURL)
        {
            var source = Path.Join(Directory.GetCurrentDirectory(), "/temp");
            var youtube = YouTube.Default;
            var vid = youtube.GetVideo(VideoURL);
            var vidName = vid.FullName;
            var client = new HttpClient();
            var MP3Name = "result.mp3";


            long? totalByte = 0;
            string videopath = Path.Combine(source, vidName);
            using (Stream output = File.OpenWrite(videopath))
            {
                using (var request = new HttpRequestMessage(HttpMethod.Head, vid.Uri))
                {
                    totalByte = client.SendAsync(request, HttpCompletionOption.ResponseHeadersRead).Result.Content.Headers.ContentLength;
                }
                using (var input = await client.GetStreamAsync(vid.Uri))
                {
                    byte[] buffer = new byte[16 * 1024];
                    int read;
                    int totalRead = 0;
                    Console.WriteLine("Download Started");
                    while ((read = input.Read(buffer, 0, buffer.Length)) > 0)
                    {
                        output.Write(buffer, 0, read);
                        totalRead += read;
                        totalProgress = (long)(totalRead * 100 / totalByte)!;

                        /*sends the download progress to HttpContext*/

                        Console.Write($"\rDownloading {totalProgress}%...");
                    }
                    Console.WriteLine("Download Complete");
                }
            }
            msg = ("Conversion in Progress...");
            string musicPath = Path.Combine(source, $"{MP3Name}");
            var inputFile = new MediaFile { Filename = Path.Combine(source, vid.FullName) };
            var outputFile = new MediaFile { Filename = musicPath };
            
            using (var engine = new Engine())
            {
                engine.GetMetaData(inputFile);
                engine.Convert(inputFile, outputFile);
            }

            msg = ("Saving to your Browser...");
            /*The byte array MUST BE CONVERTED TO Base64 String, so that it could work with JSON response,
             and be DECODED back to mp3 later on by the front-end.*/
            string mp3Data = Convert.ToBase64String(File.ReadAllBytes(musicPath));
            return mp3Data;

        }

        private static void Engine_ConvertProgressEvent(object? sender, ConvertProgressEventArgs e)
        {
            throw new NotImplementedException();
        }
    }
}

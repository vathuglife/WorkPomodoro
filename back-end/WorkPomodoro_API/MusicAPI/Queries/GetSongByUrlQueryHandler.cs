//using MediaToolkit.Model;
//using MediatR;
//using Microsoft.AspNetCore.Mvc;
//using System.Xml.Linq;
//using WorkPomodoro_API.MusicAPI.DTO;
//using WorkPomodoro_API.MusicAPI.Utils;

//namespace WorkPomodoro_API.MusicAPI.Queries
//{
//    public class GetSongByUrlQueryHandler : IRequestHandler<GetSongByUrlQuery, byte[] >
//    {
        
//        public async Task<byte[]> Handle(GetSongByUrlQuery request, CancellationToken cancellationToken)
//        {
//            YTToMp3 yTToMp3 = new YTToMp3();
//            string url = request.getSongDTO?.url!;
//            string dir = Directory.GetCurrentDirectory()+"\\tempConversionFolder";
//            var file = await Task.Run(() => yTToMp3.GetMP3(dir,url,"tempMp3"));
//             return file;            
//        }        
//    }
//}

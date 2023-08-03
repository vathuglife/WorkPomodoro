namespace WorkPomodoro_API.MusicAPI.SSE
{
    public static class SSEHttpContextExtensions
    {
        public static async Task SSEInitAsync(this HttpContext ctx)
        {
            ctx.Response.Headers.Add("Cache-Control", "no-cache");
            ctx.Response.Headers.Add("Content-Type", "text/event-stream");
            await ctx.Response.Body.FlushAsync();
        }
        /*SendDataAsync is already implemented in YTToMp3 class.*/
        //public static async Task SSESendDataAsync(this HttpContext ctx, string data)
        //{
        //    foreach (var line in data.Split('\n'))
        //        await ctx.Response.WriteAsync("data: " + line + "\n");

        //    await ctx.Response.WriteAsync("\n");
        //    await ctx.Response.Body.FlushAsync();
        //}
    }
}

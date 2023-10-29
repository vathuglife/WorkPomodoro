namespace WorkPomodoro_API.MusicAPI.DTO.Response
{
    public class PlaylistSongDTO
    {
        public int id { get; set; } 
        public string? title { get; set; }
        public string? duration { get; set; }
        public string? thumbnail { get; set; }
        public string? audioBase64 { get; set; }
    }
}

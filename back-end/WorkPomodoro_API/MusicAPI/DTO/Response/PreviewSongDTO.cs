namespace WorkPomodoro_API.MusicAPI.DTO.Response
{
    public class PreviewSongDTO
    {
        public int Id { get; set; } 
        public string? title { get; set; }
        public string? duration { get; set; }
        public string? thumbnail { get; set; }
        public bool IsInPlaylist { get; set; }  
    }
}

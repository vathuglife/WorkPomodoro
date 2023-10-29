namespace WorkPomodoro_API.MusicAPI.DTO.Request
{
    public class NewSongDTO
    {
        public int Id { get; set; }
        public string? Title { get; set; }
        public string? Duration { get; set; }
        public string? Thumbnail { get; set; }
        public string? Url { get; set; }
    }
}

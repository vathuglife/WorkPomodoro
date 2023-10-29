namespace WorkPomodoro_API.MusicAPI.DTO.Request
{
    public class RequestToPlaylistSongDTO
    {         
        public int Id { get; set; }
        public string? Title { get; set; }
        public string? Duration { get; set; }
        public string? Thumbnail { get; set; }
        public bool isInPlaylist { get; set; }
    }
}

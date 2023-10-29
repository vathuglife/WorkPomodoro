using MediatR;
using WorkPomodoro_API.MusicAPI.DTO.Request;
using WorkPomodoro_API.MusicAPI.DTO.Response;

namespace WorkPomodoro_API.MusicAPI.Queries.GetPlaylistSongs
{
    public class GetPlaylistSongsQuery:IRequest<List<PlaylistSongDTO>>
    {
        public List<RequestToPlaylistSongDTO> ?songPlaylists { get; set; }
        public string ?token { get; set; }   
    }
}

using MediatR;
using WorkPomodoro_API.MusicAPI.DTO.Request;
using WorkPomodoro_API.MusicAPI.DTO.Response;

namespace WorkPomodoro_API.MusicAPI.Commands.AddSongToPlaylist
{
    public class AddSongToPlaylistCommand : IRequest<PlaylistSongDTO>
    {

        public NewSongDTO ?newSongDTO {get;set;}
        public string? token { get; set; }
    }
}

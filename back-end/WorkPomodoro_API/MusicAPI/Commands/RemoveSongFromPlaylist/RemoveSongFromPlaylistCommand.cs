using MediatR;
using WorkPomodoro_API.MusicAPI.DTO.Request;
using WorkPomodoro_API.MusicAPI.DTO.Response;

namespace WorkPomodoro_API.MusicAPI.Commands.RemoveSongFromPlaylist
{
    public class RemoveSongFromPlaylistCommand : IRequest<bool>
    {

        public RemoveSongDTO? removeSongDTO{get;set;}
        public string? token { get; set; }
    }
}

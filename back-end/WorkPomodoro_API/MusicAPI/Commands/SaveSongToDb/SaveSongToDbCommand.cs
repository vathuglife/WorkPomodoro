using MediatR;
using WorkPomodoro_API.MusicAPI.DTO.Request;

namespace WorkPomodoro_API.MusicAPI.Commands.SaveSongToDb
{
    public class SaveSongToDbCommand:IRequest<bool>
    {
        public NewSongDTO ?SongDTO { get; set; }
        public string? url { get; set; }
        public string? token { get; set; }

    }
}

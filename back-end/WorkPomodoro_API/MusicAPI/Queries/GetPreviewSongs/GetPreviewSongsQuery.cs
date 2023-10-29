using MediatR;
using WorkPomodoro_API.MusicAPI.DTO.Response;

namespace WorkPomodoro_API.MusicAPI.Queries.GetFullSongList
{
    public class GetPreviewSongsQuery : IRequest<List<PreviewSongDTO>>
    {
        public string? token { get; set; }
    }
}

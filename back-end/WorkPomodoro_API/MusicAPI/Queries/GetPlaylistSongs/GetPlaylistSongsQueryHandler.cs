using MediatR;
using System.Security.Claims;
using System;
using WorkPomodoro_API.MusicAPI.DTO.Request;
using WorkPomodoro_API.MusicAPI.DTO.Response;
using WorkPomodoro_API.Utilities;
using WorkPomodoro_API.Entities;
using AutoMapper;

namespace WorkPomodoro_API.MusicAPI.Queries.GetPlaylistSongs
{
    public class GetPlaylistSongsQueryHandler : IRequestHandler<GetPlaylistSongsQuery, List<PlaylistSongDTO>>
    {
        private AccountUtils? _accountUtils;
        private WorkPomodoroContext _dbContext;
        private Mapper _mapper;
        public GetPlaylistSongsQueryHandler(AccountUtils? accountUtils, WorkPomodoroContext workPomodoroContext)
        {
            _accountUtils = accountUtils;
            _dbContext = workPomodoroContext;
            _mapper = MapperConfig.InitializeMapper();
        }
        public Task<List<PlaylistSongDTO>> Handle(GetPlaylistSongsQuery request, CancellationToken cancellationToken)
        {
            return System.Threading.Tasks.Task.Run(() =>
            {

                string token = request.token!;

                IEnumerable<Claim> claims = _accountUtils!.getClaims(request.token);
                int uid = Int32.Parse(claims.Where(eachClaim => eachClaim.Type == "UserId").
                                FirstOrDefault()!.Value);
                List<RequestToPlaylistSongDTO> requestToPlaylistSongDTOs = request.songPlaylists!;
                List<int> playlistSongIds = getPlaylistSongsId(requestToPlaylistSongDTOs);
                return GetSongPreviewList(playlistSongIds, uid);
            });
        }


        private List<int> getPlaylistSongsId(List<RequestToPlaylistSongDTO> requestToPlaylistSongDTOs)
        {
            List<int> playlistSongIds = new List<int>();
            requestToPlaylistSongDTOs.ForEach((playlistSongDto) => playlistSongIds.Add(playlistSongDto.Id));
            return playlistSongIds;
        }
        private List<PlaylistSongDTO> GetSongPreviewList(List<int> playlistSongIds, int uid)
        {
            List<PlaylistSongDTO> songPreviewDTOs = new List<PlaylistSongDTO>();
            List<Song> songs = _dbContext.Songs.Where(song => playlistSongIds.Contains(song.Id)
                                                    && song.AccountUid == uid)
                                                .ToList();

            foreach (Song song in songs)
            {
                PlaylistSongDTO songPreviewDTO = _mapper.Map<PlaylistSongDTO>(song);
                songPreviewDTO.audioBase64 = Convert.ToBase64String(song.AudioBase64);
                songPreviewDTOs.Add(songPreviewDTO);
            }
            return songPreviewDTOs;
        }
    }
}

using MediatR;
using System.Security.Claims;
using System;
using WorkPomodoro_API.MusicAPI.DTO.Request;
using WorkPomodoro_API.MusicAPI.DTO.Response;
using WorkPomodoro_API.Utilities;
using WorkPomodoro_API.Entities;
using AutoMapper;

namespace WorkPomodoro_API.MusicAPI.Queries.GetFullSongList
{
    public class GetPreviewSongsQueryHandler : IRequestHandler<GetPreviewSongsQuery, List<PreviewSongDTO>>
    {
        private AccountUtils? _accountUtils;
        private WorkPomodoroContext _dbContext;
        private Mapper _mapper;
        public GetPreviewSongsQueryHandler(AccountUtils? accountUtils,WorkPomodoroContext workPomodoroContext)
        {
            _accountUtils = accountUtils;   
            _dbContext = workPomodoroContext;
            _mapper = MapperConfig.InitializeMapper();  
        }
        public Task<List<PreviewSongDTO>> Handle(GetPreviewSongsQuery request, CancellationToken cancellationToken)
        {
            return System.Threading.Tasks.Task.Run(() =>
            {
                
                string token = request.token!;

                IEnumerable<Claim> claims = _accountUtils!.getClaims(request.token);
                int uid = Int32.Parse(claims.Where(eachClaim => eachClaim.Type == "UserId").
                                FirstOrDefault()!.Value);
                return GetSongPreviewList(uid);
            });
        }
        private List<PreviewSongDTO> GetSongPreviewList(int uid) {
            List<PreviewSongDTO> songPreviewDTOs = new List<PreviewSongDTO>();
            List<Song> songs = _dbContext.Songs.Where(song => song.AccountUid == uid).ToList();            
            
            foreach (Song song in songs)
            {
                PreviewSongDTO songPreviewDTO = _mapper.Map<PreviewSongDTO>(song);  
                songPreviewDTOs.Add(songPreviewDTO);
            }
            return songPreviewDTOs;
        }
    }
}

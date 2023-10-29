using MediatR;
using System.Security.Claims;
using WorkPomodoro_API.MusicAPI.DTO.Response;
using WorkPomodoro_API.Utilities;
using WorkPomodoro_API.Entities;
using AutoMapper;

namespace WorkPomodoro_API.MusicAPI.Commands.RemoveSongFromPlaylist
{
    public class RemoveSongFromPlaylistCommandHandler : IRequestHandler<RemoveSongFromPlaylistCommand, bool>
    {
        private AccountUtils? _accountUtils;
        private WorkPomodoroContext _dbContext;
        private Mapper _mapper;
        public RemoveSongFromPlaylistCommandHandler(AccountUtils? accountUtils, WorkPomodoroContext workPomodoroContext)
        {
            _accountUtils = accountUtils;
            _dbContext = workPomodoroContext;
            _mapper = MapperConfig.InitializeMapper();
        }
        public Task<bool> Handle(RemoveSongFromPlaylistCommand request, CancellationToken cancellationToken)
        {
            return System.Threading.Tasks.Task.Run(() =>
            {

                string token = request.token!;
                int songId = request.removeSongDTO!.Id;
                IEnumerable<Claim> claims = _accountUtils!.getClaims(request.token);
                int uid = int.Parse(claims.Where(eachClaim => eachClaim.Type == "UserId").
                                FirstOrDefault()!.Value);
                return RemoveSongFromPlaylist(uid,songId);
            });
        }
        private bool RemoveSongFromPlaylist(int uid,int songId)
        {
            
            Song targetSong = _dbContext.Songs.Where(song => song.AccountUid == uid 
                                                            && song.Id == songId)
                                            .FirstOrDefault()!;
            if (targetSong is null) return false!;
            targetSong.IsInPlaylist = false;
            _dbContext.SaveChanges();            
            return true;
        }
    }
}

using MediatR;
using System.Security.Claims;
using WorkPomodoro_API.MusicAPI.DTO.Response;
using WorkPomodoro_API.Utilities;
using WorkPomodoro_API.Entities;
using AutoMapper;

namespace WorkPomodoro_API.MusicAPI.Commands.AddSongToPlaylist
{
    public class AddSongToPlaylistCommandHandler: IRequestHandler<AddSongToPlaylistCommand, PlaylistSongDTO>
    {
        private AccountUtils? _accountUtils;
        private WorkPomodoroContext _dbContext;
        private Mapper _mapper;
        public AddSongToPlaylistCommandHandler(AccountUtils? accountUtils, WorkPomodoroContext workPomodoroContext)
        {
            _accountUtils = accountUtils;
            _dbContext = workPomodoroContext;
            _mapper = MapperConfig.InitializeMapper();
        }
        public Task<PlaylistSongDTO> Handle(AddSongToPlaylistCommand request, CancellationToken cancellationToken)
        {
            return System.Threading.Tasks.Task.Run(() =>
            {

                string token = request.token!;
                int songId = request.newSongDTO!.Id;
                IEnumerable<Claim> claims = _accountUtils!.getClaims(request.token);
                int uid = int.Parse(claims.Where(eachClaim => eachClaim.Type == "UserId").
                                FirstOrDefault()!.Value);
                return AddSongToPlaylist(uid,songId);
            });
        }
        private PlaylistSongDTO AddSongToPlaylist(int uid,int songId)
        {
            
            Song targetSong = _dbContext.Songs.Where(song => song.AccountUid == uid 
                                                            && song.Id == songId)
                                            .FirstOrDefault()!;
            if (targetSong is null) return null!;
            targetSong.IsInPlaylist = true;
            _dbContext.SaveChanges();
            PlaylistSongDTO result= _mapper.Map<PlaylistSongDTO>(targetSong);


            return result;
        }
    }
}

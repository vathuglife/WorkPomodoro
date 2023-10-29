using AutoMapper;
using MediatR;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using WorkPomodoro_API.Entities;
using WorkPomodoro_API.MusicAPI.DTO.Request;
using WorkPomodoro_API.Utilities;

namespace WorkPomodoro_API.MusicAPI.Commands.SaveSongToDb
{
    public class SaveSongToDbCommandHandler : IRequestHandler<SaveSongToDbCommand, bool>
    {
        private WorkPomodoroContext? _dbContext;
        private AccountUtils? accountUtils;
        private Mapper _mapper;
        public SaveSongToDbCommandHandler(WorkPomodoroContext _dbContext,
                                    AccountUtils accountUtils)
        {
            this._dbContext = _dbContext;
            this.accountUtils = accountUtils;
            _mapper = MapperConfig.InitializeMapper();
        }
        public async Task<bool> Handle(SaveSongToDbCommand request, CancellationToken cancellationToken)
        {
         
            string url = request.url!;
            string token = request.token!;
            NewSongDTO songDto = request.SongDTO!;
            string audioBase64 = await YTToMp3.GetMP3(url);


            IEnumerable<Claim> claims = accountUtils!.getClaims(request.token);
            int uid = Int32.Parse(claims.Where(eachClaim => eachClaim.Type == "UserId").
                            FirstOrDefault()!.Value);


            return saveToDb(songDto,audioBase64, uid);
                      
        }
        private bool saveToDb(NewSongDTO songDto,string audioBase64, int uid)
        {
            try
            {
                Account existingAcc = _dbContext?.Accounts.Where(acc => acc.Uid == uid).FirstOrDefault()!; 
                if (existingAcc == null) { return false; }
                ICollection <Song> songs = null!;
                if (songs.IsNullOrEmpty())
                {
                    songs = new List<Song>();
                }
                songs = existingAcc.Songs!;
                Song song = _mapper.Map<Song>(songDto);
                song.AudioBase64 = Convert.FromBase64String(audioBase64);
                song.AccountUid = uid;
                songs.Add(song);
                existingAcc.Songs = songs;
                _dbContext?.SaveChanges();

            }
            catch (Exception)
            {

            }
            return false;
        }
    }
}

using MediatR;
using System.Security.Claims;
using System.Text.RegularExpressions;
using WorkPomodoro_API.AccountAPI.DTO;
using WorkPomodoro_API.Entities;
using WorkPomodoro_API.Utilities;
using static System.Net.Mime.MediaTypeNames;

namespace WorkPomodoro_API.AccountAPI.Commands.UpdateAccount
{
    public class UpdateAccountCommandHandler : IRequestHandler<UpdateAccountCommand, bool>
    {
        private WorkPomodoroContext ?workPomodoroContext;
        private AccountUtils ?accountUtils;
        public UpdateAccountCommandHandler(WorkPomodoroContext? workPomodoroContext,
                                    AccountUtils accountUtils)
        {
            this.workPomodoroContext = workPomodoroContext;
            this.accountUtils = accountUtils;
        }   

        public Task<bool> Handle(UpdateAccountCommand request, CancellationToken cancellationToken)
        {

            return System.Threading.Tasks.Task.Run(() =>
            {
                UpdateAccountDTO dto = request.UpdateAccountDTO!;
                IEnumerable<Claim> claims = accountUtils!.getClaims(request.token);
                int uid = Int32.Parse(claims.Where(eachClaim => eachClaim.Type == "UserId").
                                FirstOrDefault()!.Value);

                return updateExistingAccountDetails(dto, uid); 
            });            
        }
        private bool updateExistingAccountDetails(UpdateAccountDTO dto,int uid)
        {
            try
            {
                Account existingAcc = workPomodoroContext?.Accounts.
                                        Where(acc => acc.Uid.Equals(uid))
                                        .FirstOrDefault()!;

                existingAcc.Username = dto.Username;
                existingAcc.Password = accountUtils!.encryptPassword(dto.Password!);
                existingAcc.Name = dto.Name;
                string rawImg = Regex.Replace(dto.Image!, @"^data:image\/[a-zA-Z]+;base64,", string.Empty);
                existingAcc.Image = Convert.FromBase64String(rawImg);
                workPomodoroContext!.Update(existingAcc);
                workPomodoroContext!.SaveChanges();
                return true;

            }catch (Exception)
            {
                return false;
            }            
        }
    }
}

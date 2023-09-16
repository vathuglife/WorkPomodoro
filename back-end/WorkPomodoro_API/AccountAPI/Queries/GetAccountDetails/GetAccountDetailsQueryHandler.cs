using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using WorkPomodoro_API.AccountAPI.DTO;
using WorkPomodoro_API.Entities;
using WorkPomodoro_API.Utilities;

namespace WorkPomodoro_API.AccountAPI.Queries.GetAccountDetails
{
    public class GetAccountDetailsQueryHandler : IRequestHandler<GetAccountDetailsQuery, ReadAccountDTO>
    {
        private readonly WorkPomodoroContext workPomodoroDbContext;
        private readonly AccountUtils _accountUtils;

        //Inject a new existence/instance of WorkPomodoroDbContext, for this Handler to query the data..
        public GetAccountDetailsQueryHandler(WorkPomodoroContext workPomodoroDbContext,AccountUtils accountUtils)
        {
            this.workPomodoroDbContext = workPomodoroDbContext;
            this._accountUtils = accountUtils;
        }
        public async Task<ReadAccountDTO> Handle(GetAccountDetailsQuery request, CancellationToken cancellationToken)
        {
            IEnumerable<Claim> claims = _accountUtils.getClaims(request.Token);
            int uid = Int32.Parse(claims.Where(eachClaim => eachClaim.Type == "UserId").
                              FirstOrDefault()!.Value);

            Account? accEntity = await workPomodoroDbContext.
                Accounts.FirstOrDefaultAsync(acc => acc.Uid!.Equals(uid), cancellationToken);
            
            if (accEntity == null)
            {
                return default!;
            }
          
            return returnAccountDTO(accEntity)!;

        }
        private ReadAccountDTO? returnAccountDTO(Account accEntity)
        {
            ReadAccountDTO readAccountDTO = new ReadAccountDTO();
            readAccountDTO.Uid = accEntity.Uid;
            readAccountDTO.Name = accEntity.Name;
            readAccountDTO.Username = accEntity.Username;
            readAccountDTO.Image = "data:image/png;base64," + Convert.ToBase64String(accEntity.Image!);
            return readAccountDTO;  
        }
    }
}

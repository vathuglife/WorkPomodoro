using MediatR;
using Microsoft.AspNetCore.Authorization.Infrastructure;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Security.Claims;
using WorkPomodoro_API.AccountAPI.DTO;
using WorkPomodoro_API.Entities;
using WorkPomodoro_API.Utilities;

namespace WorkPomodoro_API.AccountAPI.Authentication.ValidateToken
{
    public class ValidateTokenRequestHandler : IRequestHandler<ValidateTokenRequest, bool>
    {
        private WorkPomodoroContext _dbContext;
        private AccountUtils _accountUtils;
        public ValidateTokenRequestHandler(WorkPomodoroContext dbContext,AccountUtils accountUtils)
        {
            _dbContext = dbContext;
            _accountUtils = accountUtils;
        }
        public Task<bool> Handle(ValidateTokenRequest request, CancellationToken cancellationToken)
        {
            
            return System.Threading.Tasks.Task.Run(() =>
            {
                /*Extracts the userId from the Claim, then passes it to the DbContext to check for existence in SQL.*/
                IEnumerable<Claim> claims = _accountUtils.getClaims(request.token);
                int userId = Int32.Parse(claims.Where(eachClaim => eachClaim.Type == "UserId").
                                FirstOrDefault()!.Value);
                
                Account? account = _dbContext!.Accounts!
                .FirstOrDefault(acc => acc!.Uid == userId!);

                if (account == null) return false;
                return true;
            });            
        }
    }
}

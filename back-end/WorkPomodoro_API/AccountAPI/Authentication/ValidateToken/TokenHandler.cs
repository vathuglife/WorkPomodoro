using MediatR;
using Microsoft.AspNetCore.Authorization.Infrastructure;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Security.Claims;
using WorkPomodoro_API.AccountAPI.DTO;
using WorkPomodoro_API.AccountAPI.Entity;
using WorkPomodoro_API.Context;

namespace WorkPomodoro_API.AccountAPI.Authentication.ValidateToken
{
    public class TokenHandler : IRequestHandler<Token, bool>
    {
        private WorkPomodoroDbContext _dbContext;
        public TokenHandler(WorkPomodoroDbContext dbContext)
        {
            _dbContext = dbContext;

        }
        public async Task<bool> Handle(Token request, CancellationToken cancellationToken)
        {
            List<Claim> claimsList = request.claims!.ToList();
            bool result = await Task.Run(() =>
            {
                /*Extracts the userId from the Claim, then passes it to the DbContext to check for existence in SQL.*/
                string userId = claimsList.Where(eachClaim => eachClaim.Type == "UserId").
                                FirstOrDefault()!.Value;
                Account? account = _dbContext!.Accounts!
                .FirstOrDefault(acc => acc!.uid == userId!);


                if (account == null) return false;
                return true;
            });
            return result;
        }
    }
}

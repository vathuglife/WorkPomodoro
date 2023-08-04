using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Security.Principal;
using System.Text;
using WorkPomodoro_API.Entities;

namespace WorkPomodoro_API.Utilities
{
    public class AccountUtils
    {
        private WorkPomodoroContext _dbContext;
        public AccountUtils(WorkPomodoroContext dbContext)
        {
            _dbContext = dbContext;
        }

        /*Type parameter (where T:class) allows us to pass in the Type (a.k.a Class Name, e.g. Song, Task, Account...)*/
        private string incrementNumberSection(string numberSection)
        {
            int number = int.Parse(numberSection);
            number++;

            if (number < 10) return number.ToString("D5");

            else if (number < 100) return number.ToString("D4");

            else if (number < 1000) return number.ToString("D3");

            else if (number < 10000) return number.ToString("D2");

            else return number.ToString("D1");

        }
        
        public string? idGenerator(string previousId)
        {            
            
            string charSection = previousId.Substring(0, 3).ToUpper();
            string numberSection = incrementNumberSection(previousId.Substring(3, 5)!);
                           
            return charSection+numberSection;

        }
        public bool isUsernameDuplicated(string? username)
        {
            bool result = false;
            Account? account = _dbContext.Accounts
                    .Where(acc => acc.Username!.Equals(username))
                    .FirstOrDefault();
            if (account != null) { result = true; }
            return result;

        }
        public IEnumerable<Claim> getClaims(string? jwtToken)
        {
            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
            JwtSecurityToken securityToken = (JwtSecurityToken)tokenHandler.ReadToken(jwtToken);
            IEnumerable<Claim> claims = securityToken.Claims;
            return claims;
        }
    
   


    }
}

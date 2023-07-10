using System.Security.Principal;
using WorkPomodoro_API.AccountAPI.Entity;
using WorkPomodoro_API.Context;


namespace WorkPomodoro_API.Service
{
    public class Utils
    {
        private readonly WorkPomodoroDbContext _dbContext;
        public Utils(WorkPomodoroDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public string? idGenerator(string? latestId)
        {
            string? result = null;
            
            if (latestId == null) return null;
            string? charSection = latestId.Substring(0, 3);            
            string numberSection = latestId.Substring(3, 5);

            int number = Int32.Parse(numberSection);

            number++;
            if (number < 10)
            {
                result = charSection + number.ToString("D5");
            }
            else if (number < 100)
            {
                result = charSection + number.ToString("D4");
            }
            else if (number < 1000)
            {
                result = charSection + number.ToString("D3");
            }
            else if (number < 10000)
            {
                result = charSection + number.ToString("D2");
            }
            else
            {
                result = charSection + number.ToString("D1");
            }

            return result;

        }
        public bool isUsernameDuplicated(string? username)
        {
            bool result = false;
            Account? account = _dbContext.Accounts
                    .Where(acc => acc.username.Equals(username))
                    .FirstOrDefault();
            if (account != null) { result = true; }
            return result;

        }
    }
}

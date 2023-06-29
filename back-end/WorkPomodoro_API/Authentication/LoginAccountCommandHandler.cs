using MediatR;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using WorkPomodoro_API.DTO;
using WorkPomodoro_API.Entity;
using WorkPomodoro_API.Repository;

namespace WorkPomodoro_API.LoginAccount
{
    public class LoginAccountCommandHandler : IRequestHandler<LoginAccountCommand, string>
    {
        private readonly WorkPomodoroDbContext _dbContext;
        protected readonly IConfiguration _configuration;
        public LoginAccountCommandHandler(WorkPomodoroDbContext dbContext, IConfiguration configuration)
        {
            this._dbContext = dbContext;
            this._configuration = configuration;
        }
        public async Task<string> Handle(LoginAccountCommand request, CancellationToken cancellationToken)
        {

            LoginAccountDTO? loginAccountDTO = request.loginAccountDTO;

            string result = await System.Threading.Tasks.Task.Run(() =>
            {
                string username = loginAccountDTO!.username!;
                string password = loginAccountDTO!.password!;
                Account account = (Account)_dbContext.Accounts
                .FirstOrDefault(acc => acc.username == username &&
                    acc.password == password);

                if (account == null) return null!;

                var issuer = _configuration.GetSection("Jwt:Issuer").ToString();
                var audience = _configuration.GetSection("Jwt:Audience").ToString();
                var key = Encoding.ASCII.GetBytes
                (_configuration.GetSection("Jwt:Key").ToString()!);
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new[]
                    {
                    new Claim("Id",account!.uid!),
                        new Claim(JwtRegisteredClaimNames.Name, account.name!),
                        }),
                    Expires = DateTime.UtcNow.AddMinutes(5),
                    Issuer = issuer,
                    Audience = audience,
                    SigningCredentials = new SigningCredentials
                    (new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha512Signature)
                };
                var tokenHandler = new JwtSecurityTokenHandler();
                var token = tokenHandler.CreateToken(tokenDescriptor);
                var jwtToken = tokenHandler.WriteToken(token);
                result = tokenHandler.WriteToken(token).ToString();
                return result;
            });

            return result;
        }
    }
}

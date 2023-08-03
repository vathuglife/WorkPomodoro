using MediatR;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using WorkPomodoro_API.AccountAPI.DTO;
using WorkPomodoro_API.Context;
using WorkPomodoro_API.Entity;

namespace WorkPomodoro_API.AccountAPI.Authentication.Login
{
    public class LoginHandler : IRequestHandler<Login, string>
    {
        private readonly WorkPomodoroDbContext _dbContext;
        protected readonly IConfiguration _configuration;
        public LoginHandler(WorkPomodoroDbContext dbContext, IConfiguration configuration)
        {
            _dbContext = dbContext;
            _configuration = configuration;
        }
        public async Task<string> Handle(Login request, CancellationToken cancellationToken)
        {

            LoginAccountDTO? loginAccountDTO = request.loginAccountDTO;

            string result = await System.Threading.Tasks.Task.Run(() =>
            {
                string username = loginAccountDTO!.username!;                                
                Account account = _dbContext.Accounts
                                .FirstOrDefault(acc => acc.username == username)!;

                
                if (account == null || !BCrypt.Net.BCrypt.Verify(loginAccountDTO.password, account.password)) 
                    return null!;

                var claims = new[] {
                        new Claim(JwtRegisteredClaimNames.Sub, _configuration.GetSection("Jwt:Subject").ToString()!),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                        new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                        new Claim("UserId", account.uid!),
                        new Claim("DisplayName", account.name!),
                        new Claim("UserName", account.username!),
                    };

                
                /*IMPORTANT NOTE: DO NOT CONVERT the GetBytes to String! Or else, the generated token will be malfunctioned,
                 and ASP NET Core won't be able to validate it when the user tries to login again.
                 */
                var key = new SymmetricSecurityKey(
                    Encoding.UTF8.GetBytes(_configuration.GetSection("Jwt:Key").Value!));
                var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                var token = new JwtSecurityToken(
                    _configuration["Jwt:Issuer"],
                    _configuration["Jwt:Audience"],
                    claims,
                    expires: DateTime.UtcNow.AddMinutes(10),
                    signingCredentials: signIn);

                return new JwtSecurityTokenHandler().WriteToken(token);
            });

            return result;
        }
    }
}

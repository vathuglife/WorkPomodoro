using MediatR;
using WorkPomodoro_API.AccountAPI.DTO;


namespace WorkPomodoro_API.AccountAPI.Authentication.Login
{
    public class Login : IRequest<string>
    {
        public LoginAccountDTO? loginAccountDTO { get; set; }
    }
}

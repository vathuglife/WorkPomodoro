using MediatR;
using WorkPomodoro_API.DTO;

namespace WorkPomodoro_API.LoginAccount
{
    public class LoginAccountCommand : IRequest<string>
    {
        public LoginAccountDTO? loginAccountDTO { get; set; }
    }
}

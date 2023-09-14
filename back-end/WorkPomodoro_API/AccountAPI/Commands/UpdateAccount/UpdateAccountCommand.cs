using MediatR;
using WorkPomodoro_API.AccountAPI.DTO;

namespace WorkPomodoro_API.AccountAPI.Commands.UpdateAccount
{
    public class UpdateAccountCommand:IRequest<bool>
    {
        public UpdateAccountDTO ?UpdateAccountDTO { get; set; }  
        public string ?token { get; set; }   
    }
}

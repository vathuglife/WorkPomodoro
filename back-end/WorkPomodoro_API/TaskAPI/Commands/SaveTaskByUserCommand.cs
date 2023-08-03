using MediatR;
using WorkPomodoro_API.AccountAPI.Authentication.ValidateToken;
using WorkPomodoro_API.TaskAPI.DTO;

namespace WorkPomodoro_API.TaskAPI.Commands
{
    public class SaveTaskByUserCommand : IRequest<bool>
    {
        public string ?jwtToken { get; set; }
        public List<TaskDTO> ?createTaskDTO { get; set; }   
    }
}

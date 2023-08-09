using MediatR;
using WorkPomodoro_API.TaskAPI.DTO;

namespace WorkPomodoro_API.TaskAPI.Queries.GetTopTask
{
    public class GetTopTaskByUserQuery : IRequest<TaskDTO>
    {
        public string? jwtToken { get; set; }

    }
}

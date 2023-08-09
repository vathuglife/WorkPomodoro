using MediatR;
using WorkPomodoro_API.TaskAPI.DTO;

namespace WorkPomodoro_API.TaskAPI.Queries.GetTasks
{
    public class GetTasksByUserQuery : IRequest<List<TaskDTO>>
    {
        public string? jwtToken { get; set; }

    }
}

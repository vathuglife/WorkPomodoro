using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Net.Http.Headers;
using WorkPomodoro_API.TaskAPI.Commands;
using WorkPomodoro_API.TaskAPI.DTO;
using WorkPomodoro_API.TaskAPI.Queries.GetTasks;
using WorkPomodoro_API.TaskAPI.Queries.GetTopTask;

namespace WorkPomodoro_API.TaskAPI.Controllers
{
    public class TaskQueryController : Controller
    {
        private readonly IMediator _mediator;
        public TaskQueryController(IMediator mediator)
        {
            _mediator = mediator;

        }

        [HttpGet]
        [Route("workpomodoro/user/tasks")]
        [Authorize]
        public async Task<IActionResult> GetTasksByUser()
        {
            string? jwtToken = Request.Headers[HeaderNames.Authorization].ToString().Remove(0, 7);
            GetTasksByUserQuery query = new GetTasksByUserQuery();            
            query.jwtToken = jwtToken;

            List<TaskDTO> result = await _mediator.Send(query);
            if (result==null) return BadRequest();
            
            return Ok(result);
        }
        [HttpGet]
        [Route("workpomodoro/user/toptask")]
        [Authorize]
        public async Task<IActionResult> GetTopTaskByUser()
        {
            string? jwtToken = Request.Headers[HeaderNames.Authorization].ToString().Remove(0, 7);
            GetTopTaskByUserQuery query = new GetTopTaskByUserQuery();
            query.jwtToken = jwtToken;

            TaskDTO result = await _mediator.Send(query);
            if (result == null) return BadRequest();

            return Ok(result);
        }
    }
}

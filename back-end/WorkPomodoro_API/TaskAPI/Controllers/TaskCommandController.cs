using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Net.Http.Headers;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using WorkPomodoro_API.AccountAPI.Authentication.ValidateToken;
using WorkPomodoro_API.TaskAPI.Commands;
using WorkPomodoro_API.TaskAPI.DTO;

namespace WorkPomodoro_API.TaskAPI.Controllers
{
    public class TaskCommandController : Controller
    {
        private readonly IMediator _mediator;
        public TaskCommandController(IMediator mediator)
        {
            _mediator = mediator;

        }

        [HttpPost]
        [Route("workpomodoro/user/tasks")]
        [Authorize]
        public async Task<IActionResult> SaveTaskByUser([FromBody] List<TaskDTO> createTaskDTO)
        {
            string? jwtToken = Request.Headers[HeaderNames.Authorization].ToString().Remove(0, 7);                        
            SaveTaskByUserCommand command = new SaveTaskByUserCommand();
            command.createTaskDTO = createTaskDTO;
            command.jwtToken = jwtToken;

            bool result = await _mediator.Send(command);
            if(!result) return BadRequest();
            return Ok("The operation was successfully completed.");
        }
    }
}

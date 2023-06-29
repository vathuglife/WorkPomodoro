using MediatR;
using Microsoft.AspNetCore.Mvc;
using WorkPomodoro_API.DTO;
using WorkPomodoro_API.LoginAccount;

namespace WorkPomodoro_API.Controllers
{
    public class LoginController : Controller
    {
        private readonly IMediator _mediator;
        public LoginController(IMediator mediator)
        {
            _mediator = mediator;
        }
        
        [HttpPost]
        [Route("workPomodoro/login")]
        public async Task<IActionResult> login([FromBody] LoginAccountDTO loginAccountDTO) {
            var command = new LoginAccountCommand();
            command.loginAccountDTO = loginAccountDTO;
            string token = await _mediator.Send(command);
            if (token == null) return BadRequest("Login credentials might be incorrect.");
            return Ok(token);
        }

    }
}

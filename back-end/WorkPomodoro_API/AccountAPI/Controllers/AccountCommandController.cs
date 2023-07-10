using MediatR;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using WorkPomodoro_API.AccountAPI.Commands.CreateAccount;
using WorkPomodoro_API.AccountAPI.DTO;


namespace WorkPomodoro_API.AccountAPI.Controllers
{

    public class AccountCommandController : Controller
    {
        private readonly IMediator _mediator;
        public AccountCommandController(IMediator mediator)
        {
            _mediator = mediator;
        }
        [HttpPost]
        [Route("workpomodoro/signup")]
        public async Task<IActionResult> createAccount([FromBody] CreateAccountDTO createAccountDTO)
        {
            var command = new CreateAccountCommand();
            command.createAccountDTO = createAccountDTO;
            var response = await _mediator.Send(command);
            if (response == null) { return BadRequest(); }
            return Ok(response);

        }
    }
}

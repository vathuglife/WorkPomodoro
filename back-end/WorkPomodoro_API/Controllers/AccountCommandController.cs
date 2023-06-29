using MediatR;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using WorkPomodoro_API.Commands.CreateAccount;
using WorkPomodoro_API.DTO;

namespace WorkPomodoro_API.Controllers
{
    
    public class AccountCommandController : Controller
    {
        private readonly IMediator _mediator;
        public AccountCommandController(IMediator mediator) { 
            _mediator= mediator;
        }
        [HttpPost]
        [Route("workPomodoro/signup")]
        public async Task <IActionResult> createAccount([FromBody] CreateAccountDTO createAccountDTO) {
            var command = new CreateAccountCommand();
            command.createAccountDTO = createAccountDTO;    
            var response = await _mediator.Send(command); 
            if(response == null) { return BadRequest(); }
            return Ok(response);
            
        }
    }
}

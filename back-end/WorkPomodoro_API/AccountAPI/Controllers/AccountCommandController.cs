using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Net.Http.Headers;
using WorkPomodoro_API.AccountAPI.Commands.CreateAccount;
using WorkPomodoro_API.AccountAPI.Commands.UpdateAccount;
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
        
        
        [HttpPost]
        [Route("workpomodoro/update")]
        [Authorize]
        public async Task<IActionResult> updateAccountDetails([FromBody] UpdateAccountDTO updateAccountDTO)
        {
            string? rawToken = Request.Headers[HeaderNames.Authorization].ToString().Remove(0, 7);            
            var command = new UpdateAccountCommand();
            command.UpdateAccountDTO = updateAccountDTO;
            command.token = rawToken;
            
            bool response = await _mediator.Send(command);  
            if(response==false) { return BadRequest(); }
            return Ok();
        }
    }
    
}

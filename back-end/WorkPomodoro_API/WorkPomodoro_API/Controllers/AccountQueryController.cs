using MediatR;
using Microsoft.AspNetCore.Mvc;
using WorkPomodoro_API.Queries;

namespace WorkPomodoro_API.Controllers
{
    
    public class AccountQueryController : Controller
    {
        private readonly IMediator _mediator;
        //Automatically injects an instance/existance of Mediator into this Controller.
        //This is handled by the Mediator Dependency Injector installed in the package.
        public AccountQueryController(IMediator mediator)
        {
            _mediator = mediator;   
        } 

        [HttpGet]
        [Route("account/{uid}")]        
        public async Task<IActionResult> GetById(string uid)
        {
            var command = new GetAccountByIdQuery();
            command.UID = uid;
            var response = await _mediator.Send(command);
            
            if(response == null)
            {
                return BadRequest("Something Went wrong.");
            }
            return Ok(response);

        }

    }
}

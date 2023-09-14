using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Net.Http.Headers;
using System.Security.Claims;

using WorkPomodoro_API.AccountAPI.Queries.GetAccountDetails;

namespace WorkPomodoro_API.AccountAPI.Controllers
{

    /*only allows those with valid JWT token to access this controller
                The rules are specified within the Program.cs file.*/
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
        [Route("workpomodoro/account")]
        [Authorize]
        public async Task<IActionResult> GetAccountDetails()
        {

            //Gets the userId from the token which was previously sent to React (Front-end)
            //A Claim includes 2 information: Type and Value. Type is basically the same as Key in dictionary.
            string ?token = Request.Headers[HeaderNames.Authorization].ToString().Remove(0, 7);         
            var command = new GetAccountDetailsQuery();
            command.Token = token;
            var response = await _mediator.Send(command);

            if (response == null)
            {
                return BadRequest("Something Went wrong.");
            }
            return Ok(response);

        }

    }
}

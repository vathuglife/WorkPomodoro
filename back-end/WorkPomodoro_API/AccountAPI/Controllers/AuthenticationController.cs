using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Net.Http.Headers;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using WorkPomodoro_API.AccountAPI.Authentication.Login;
using WorkPomodoro_API.AccountAPI.Authentication.ValidateToken;
using WorkPomodoro_API.AccountAPI.DTO;


namespace WorkPomodoro_API.AccountAPI.Controllers
{
    public class AuthenticationController : Controller
    {
        private readonly IMediator _mediator;
        public AuthenticationController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("workpomodoro/login")]
        public async Task<IActionResult> login([FromBody] LoginAccountDTO loginAccountDTO)
        {
            var command = new Login();
            command.loginAccountDTO = loginAccountDTO;
            string tokenString = await _mediator.Send(command);
            if (tokenString == null) return BadRequest("Login credentials might be incorrect.");
            return Ok(new { token = tokenString });
        }

        [Authorize]
        [HttpGet]
        [Route("workpomodoro/validate")]
        public async Task<IActionResult> validateToken()
        {
            
            /*Extracts the token from the Request header, then decipher it into a list of Claims
             The remove keyword basically removes the "Bearer" suffix.*/

            string ?rawToken = Request.Headers[HeaderNames.Authorization].ToString().Remove(0,7);            

            ValidateTokenRequest tokenCommand = new ValidateTokenRequest();
            tokenCommand.token = rawToken;
            bool isValid = await _mediator.Send(tokenCommand);
            if (!isValid) return BadRequest("Login credentials might be incorrect.");
            return Ok();
        }

    }
}

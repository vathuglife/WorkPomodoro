using MediatR;
using System.Collections;
using System.Runtime.CompilerServices;
using System.Security.Claims;

namespace WorkPomodoro_API.AccountAPI.Authentication.ValidateToken
{
    public class ValidateTokenRequest :IRequest<bool>
    {
        /*An array-like object containing the Claims extracted from the JWT Token.*/
        public string? token { get; set; }  
    }
}

﻿using MediatR;
using WorkPomodoro_API.AccountAPI.DTO;

namespace WorkPomodoro_API.AccountAPI.Commands.CreateAccount
{
    //Receives a CreateAccountDTO (to create a new account)
    //and returns a ReadAccountDTO (containing the full details of an account)
    public class CreateAccountCommand : IRequest<ReadAccountDTO>
    {
        public CreateAccountDTO? createAccountDTO { get; set; }
    }
}

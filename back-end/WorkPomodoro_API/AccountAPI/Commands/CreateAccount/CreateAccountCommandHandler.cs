using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Identity;
using System.Security.Principal;
using WorkPomodoro_API.AccountAPI.DTO;
using WorkPomodoro_API.Entities;
using WorkPomodoro_API.Utilities;

namespace WorkPomodoro_API.AccountAPI.Commands.CreateAccount
{
    public class CreateAccountCommandHandler : IRequestHandler<CreateAccountCommand, ReadAccountDTO>
    {
        private readonly WorkPomodoroContext _dbContext;
        private readonly AccountUtils _utils;
        private readonly Mapper _mapper;
        public CreateAccountCommandHandler(WorkPomodoroContext dbContext, AccountUtils utils)
        {
            _dbContext = dbContext;
            _utils = utils;
            _mapper = MapperConfig.InitializeMapper();
        }

        public Task<ReadAccountDTO?> Handle(CreateAccountCommand request, CancellationToken cancellationToken)
        {

            return System.Threading.Tasks.Task.Run(() =>
            {

                bool isDuplicated = _utils.isUsernameDuplicated(request.createAccountDTO!.Username);
                if (isDuplicated) return null!;


                Account newAccount = _mapper.Map<Account>(request.createAccountDTO);

                saveAccountToDb(newAccount);

                return returnAccountDTO(newAccount);
            });

        }

        private void saveAccountToDb(Account newAccount)
        {
            string hashedPwd = BCrypt.Net.BCrypt.HashPassword(newAccount.Password);
            newAccount.Password = hashedPwd;
            newAccount.Role = "US"; //US for user, AD for admin.
            newAccount.Status = true; //true means active.
            _dbContext.Accounts.Add(newAccount);
            _dbContext.SaveChanges();
        }
        private ReadAccountDTO? returnAccountDTO(Account newAccount)
        {
            int uid = _dbContext.Accounts.Where(acc => acc == newAccount).FirstOrDefault()!.Uid;
            //Check if the account is already added, by querying the database again.
            Account? foundAccount = _dbContext.Accounts
                .Where(acc => acc.Uid!.Equals(uid))
                .FirstOrDefault();

            if (foundAccount == null) return null;

            ReadAccountDTO accountDTO = _mapper.Map<ReadAccountDTO>(foundAccount);
            return null;
        }
    }
}

using MediatR;
using Microsoft.AspNetCore.Identity;
using WorkPomodoro_API.AccountAPI.DTO;
using WorkPomodoro_API.Entities;
using WorkPomodoro_API.Utilities;

namespace WorkPomodoro_API.AccountAPI.Commands.CreateAccount
{
    public class CreateAccountCommandHandler : IRequestHandler<CreateAccountCommand, ReadAccountDTO>
    {
        private readonly  WorkPomodoroContext _dbContext;
        private readonly AccountUtils utils;
        public CreateAccountCommandHandler(WorkPomodoroContext dbContext, AccountUtils utils)
        {
            this._dbContext = dbContext;
            this.utils = utils;
        }

        public Task<ReadAccountDTO?> Handle(CreateAccountCommand request, CancellationToken cancellationToken)
        {

            return System.Threading.Tasks.Task.Run(() =>
            {

                bool isDuplicated = utils.isUsernameDuplicated(request.createAccountDTO!.Username);
                if (isDuplicated) return null!;


                var mapper = MapperConfig.InitializeMapper();
                Account newAccount = mapper.Map<Account>(request.createAccountDTO);
                string hashedPwd = BCrypt.Net.BCrypt.HashPassword(newAccount.Password);
                
                newAccount.Password = hashedPwd;
                newAccount.Role = "US"; //US for user, AD for admin.
                newAccount.Status = true; //true means active.
                _dbContext.Accounts.Add(newAccount);
                _dbContext.SaveChanges();


                int uid = _dbContext.Accounts.Where(acc => acc==newAccount).FirstOrDefault()!.Uid;
                //Check if the account is already added, by querying the database again.
                Account? foundAccount = _dbContext.Accounts
                    .Where(acc => acc.Uid!.Equals(uid))
                    .FirstOrDefault();

                if (foundAccount == null) return null;

                ReadAccountDTO accountDTO = mapper.Map<ReadAccountDTO>(foundAccount);
                return accountDTO;
            });




        }

    }
}

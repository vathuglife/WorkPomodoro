using MediatR;
using Microsoft.AspNetCore.Identity;
using WorkPomodoro_API.AccountAPI.DTO;
using WorkPomodoro_API.Context;
using WorkPomodoro_API.Entity;
using WorkPomodoro_API.Utilities;

namespace WorkPomodoro_API.AccountAPI.Commands.CreateAccount
{
    public class CreateAccountCommandHandler : IRequestHandler<CreateAccountCommand, ReadAccountDTO>
    {
        private readonly WorkPomodoroDbContext _dbContext;
        private readonly AccountUtils utils;
        public CreateAccountCommandHandler(WorkPomodoroDbContext dbContext, AccountUtils utils)
        {
            this._dbContext = dbContext;
            this.utils = utils;
        }

        public Task<ReadAccountDTO?> Handle(CreateAccountCommand request, CancellationToken cancellationToken)
        {

            return System.Threading.Tasks.Task.Run(() =>
            {

                bool isDuplicated = utils.isUsernameDuplicated(request.createAccountDTO!.username);
                if (isDuplicated) return null!;


                var mapper = MapperConfig.InitializeMapper();
                Account newAccount = mapper.Map<Account>(request.createAccountDTO);
                string hashedPwd = BCrypt.Net.BCrypt.HashPassword(newAccount.password);

                //Workflow: Get the id of the latest user/recipe,

                /* If the latest user is found: then get that user's id and increment that by one.
                    Then, we will assign it to the new user.
                * If not: then create the new id called "USR000000".*/
                string latestUid = _dbContext.Accounts.OrderByDescending(acc => acc.uid).FirstOrDefault()!.uid!;
                string newUid = "";
                if (latestUid == null) newUid = "ACC00000";
                else newUid = utils.idGenerator(latestUid)!;

                newAccount.uid = newUid;
                newAccount.password = hashedPwd;
                newAccount.role = "US"; //US for user, AD for admin.
                newAccount.status = true; //true means active.
                _dbContext.Accounts.Add(newAccount);
                _dbContext.SaveChanges();


                //Check if the account is already added, by querying the database again.
                Account? foundAccount = _dbContext.Accounts
                    .Where(acc => acc.uid!.Equals(newUid))
                    .FirstOrDefault();

                if (foundAccount == null) return null;

                ReadAccountDTO accountDTO = mapper.Map<ReadAccountDTO>(foundAccount);
                return accountDTO;
            });




        }

    }
}

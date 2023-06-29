using MediatR;
using WorkPomodoro_API.DTO;
using WorkPomodoro_API.Entity;
using WorkPomodoro_API.Repository;
using WorkPomodoro_API.Service;


namespace WorkPomodoro_API.Commands.CreateAccount
{
    public class CreateAccountCommandHandler : IRequestHandler<CreateAccountCommand, ReadAccountDTO>
    {
        private readonly WorkPomodoroDbContext workPomodoroDbContext;
        private readonly Utils utils;
        public CreateAccountCommandHandler(WorkPomodoroDbContext workPomodoroDbContext,Utils utils)
        {
            this.workPomodoroDbContext = workPomodoroDbContext;
            this.utils = utils;
        }

        public async Task<ReadAccountDTO> Handle(CreateAccountCommand request, CancellationToken cancellationToken)
        {

            ReadAccountDTO? accountDto = await System.Threading.Tasks.Task.Run(() =>
            {
                var mapper = MapperConfig.InitializeMapper();
                Account newAccount = mapper.Map<Account>(request.createAccountDTO);
                string? newUid = null;

                bool isDuplicated = utils.isUsernameDuplicated(request.createAccountDTO.username);
                if (isDuplicated)
                    return null;
                //Workflow: Get the id of the latest user/recipe,

                /* If the latest user is found: then get that user's id and increment that by one.
                    Then, we will assign it to the new user.
                * If not: then create the new id called "USR000000".*/
                Account? latestUser = workPomodoroDbContext.Accounts.OrderByDescending
                    (p => p.uid).FirstOrDefault();

                if (latestUser == null)
                {
                    newAccount.uid = "USR00000";
                    newUid = "USR00000";
                }
                else {
                    newUid = utils.idGenerator(latestUser.uid);
                    if (newUid != null) {
                        newAccount.uid = newUid;
                    }
                    
                }
                
                
                newAccount.role = "US"; //US for user, AD for admin.
                newAccount.status = true; //true means active.
                workPomodoroDbContext.Accounts.Add(newAccount);
                workPomodoroDbContext.SaveChanges();


                //Check if the account is already added, by querying the database again.
                Account?foundAccount = workPomodoroDbContext.Accounts
                    .Where(acc => acc.uid.Equals(newUid))
                    .FirstOrDefault();

                if (foundAccount == null)
                {
                    return null;
                }
                ReadAccountDTO accountDTO = mapper.Map<ReadAccountDTO>(foundAccount);
                return accountDTO;
            });


            return accountDto;

        }

    }
}

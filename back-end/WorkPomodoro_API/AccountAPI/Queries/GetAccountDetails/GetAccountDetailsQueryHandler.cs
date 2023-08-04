using MediatR;
using Microsoft.EntityFrameworkCore;
using WorkPomodoro_API.AccountAPI.DTO;
using WorkPomodoro_API.Entities;
using WorkPomodoro_API.Utilities;

namespace WorkPomodoro_API.AccountAPI.Queries.GetAccountDetails
{
    public class GetAccountDetailsQueryHandler : IRequestHandler<GetAccountDetailsQuery, ReadAccountDTO>
    {
        private readonly WorkPomodoroContext workPomodoroDbContext;

        //Inject a new existence/instance of WorkPomodoroDbContext, for this Handler to query the data..
        public GetAccountDetailsQueryHandler(WorkPomodoroContext workPomodoroDbContext)
        {
            this.workPomodoroDbContext = workPomodoroDbContext;
        }
        public async Task<ReadAccountDTO> Handle(GetAccountDetailsQuery request, CancellationToken cancellationToken)
        {
            Account? accEntity = await workPomodoroDbContext.
                Accounts.FirstOrDefaultAsync(acc => acc.Uid!.Equals(request.UID), cancellationToken);
            if (accEntity == null)
            {
                return default!;
            }
            var mapper = MapperConfig.InitializeMapper();
            ReadAccountDTO accountDTO = mapper.Map<ReadAccountDTO>(accEntity);

            return accountDTO;

        }
    }
}

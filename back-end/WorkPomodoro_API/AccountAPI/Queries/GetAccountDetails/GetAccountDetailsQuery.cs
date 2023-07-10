using MediatR;
using WorkPomodoro_API.AccountAPI.DTO;

namespace WorkPomodoro_API.AccountAPI.Queries.GetAccountDetails
{
    //Query: Contains the data to be returned to the front-end (AccountDTO)
    //as well as the from the Front-end (Id)
    public class GetAccountDetailsQuery : IRequest<ReadAccountDTO>
    {
        public string? UID { get; set; }
    }
}

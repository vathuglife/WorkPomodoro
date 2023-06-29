using MediatR;
using WorkPomodoro_API.DTO;

namespace WorkPomodoro_API.Queries
{
    //Query: Contains the data to be returned to the front-end (AccountDTO)
    //as well as the from the Front-end (Id)
    public class GetAccountByIdQuery:IRequest<ReadAccountDTO>
    {
        public string? UID { get; set; }    
    }
}

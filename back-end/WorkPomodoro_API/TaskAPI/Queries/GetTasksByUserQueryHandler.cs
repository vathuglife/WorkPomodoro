using AutoMapper;
using MediatR;
using WorkPomodoro_API.AccountAPI.Authentication.ValidateToken;
using WorkPomodoro_API.Entities;
using WorkPomodoro_API.TaskAPI.DTO;
using WorkPomodoro_API.Utilities;

namespace WorkPomodoro_API.TaskAPI.Queries
{
    public class GetTasksByUserQueryHandler : IRequestHandler<GetTasksByUserQuery, List<TaskDTO>>
    {
        private readonly AccountUtils _utils;
        private WorkPomodoroContext _dbContext;
        private Mapper _mapper;
        public GetTasksByUserQueryHandler(AccountUtils utils,WorkPomodoroContext dbContext)
        {
            _utils = utils; 
            _dbContext = dbContext;
            _mapper = MapperConfig.InitializeMapper();
        }
        public Task<List<TaskDTO>> Handle(GetTasksByUserQuery request, CancellationToken cancellationToken)
        {
            
            return System.Threading.Tasks.Task.Run(()=> {
                
                string jwtToken = request.jwtToken!;
                int userId = Int32.Parse(_utils.getClaims(jwtToken).Where(eachClaim => eachClaim.Type == "UserId").
                               FirstOrDefault()!.Value);

                if (userId == 0) { return null!; }                

                List<Entities.Task> tasks = _dbContext.Tasks.Where(task => task.Uid==userId).ToList();    
                List<TaskDTO> result = new List<TaskDTO>();
                
                foreach(Entities.Task task in tasks) {
                    TaskDTO taskDTO = _mapper.Map<TaskDTO>(task);
                    result.Add(taskDTO);    
                }
                return result;
                
            });
                        
        }
    }
}

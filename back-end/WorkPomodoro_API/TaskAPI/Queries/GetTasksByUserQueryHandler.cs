using AutoMapper;
using MediatR;
using WorkPomodoro_API.AccountAPI.Authentication.ValidateToken;
using WorkPomodoro_API.Context;
using WorkPomodoro_API.Entity;
using WorkPomodoro_API.TaskAPI.DTO;
using WorkPomodoro_API.Utilities;

namespace WorkPomodoro_API.TaskAPI.Queries
{
    public class GetTasksByUserQueryHandler : IRequestHandler<GetTasksByUserQuery, List<TaskDTO>>
    {
        private readonly AccountUtils _utils;
        private WorkPomodoroDbContext _dbContext;
        private Mapper _mapper;
        public GetTasksByUserQueryHandler(AccountUtils utils,WorkPomodoroDbContext dbContext)
        {
            _utils = utils; 
            _dbContext = dbContext;
            _mapper = MapperConfig.InitializeMapper();
        }
        public Task<List<TaskDTO>> Handle(GetTasksByUserQuery request, CancellationToken cancellationToken)
        {
            
            return System.Threading.Tasks.Task.Run(()=> {
                
                string jwtToken = request.jwtToken!;
                string userId = _utils.getClaims(jwtToken).Where(eachClaim => eachClaim.Type == "UserId").
                               FirstOrDefault()!.Value;

                if (userId == null) { return null!; }                

                List<Entity.Task> tasks = _dbContext.Tasks.Where(task => task.uid==userId).ToList();    
                List<TaskDTO> result = new List<TaskDTO>();
                
                foreach(Entity.Task task in tasks) {
                    TaskDTO taskDTO = _mapper.Map<TaskDTO>(task);
                    result.Add(taskDTO);    
                }
                return result;
                
            });
                        
        }
    }
}

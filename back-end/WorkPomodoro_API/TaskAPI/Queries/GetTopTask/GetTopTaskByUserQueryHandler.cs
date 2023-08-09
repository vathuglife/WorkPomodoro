using AutoMapper;
using MediatR;
using WorkPomodoro_API.AccountAPI.Authentication.ValidateToken;
using WorkPomodoro_API.Entities;
using WorkPomodoro_API.TaskAPI.DTO;
using WorkPomodoro_API.Utilities;

namespace WorkPomodoro_API.TaskAPI.Queries.GetTopTask
{
    public class GetTopTaskByUserQueryHandler : IRequestHandler<GetTopTaskByUserQuery, TaskDTO>
    {
        private readonly AccountUtils _utils;
        private WorkPomodoroContext _dbContext;
        private Mapper _mapper;
        public GetTopTaskByUserQueryHandler(AccountUtils utils, WorkPomodoroContext dbContext)
        {
            _utils = utils;
            _dbContext = dbContext;
            _mapper = MapperConfig.InitializeMapper();
        }
        public Task<TaskDTO> Handle(GetTopTaskByUserQuery request, CancellationToken cancellationToken)
        {

            return System.Threading.Tasks.Task.Run(() =>
            {

                string jwtToken = request.jwtToken!;
                int userId = int.Parse(_utils.getClaims(jwtToken).Where(eachClaim => eachClaim.Type == "UserId").
                               FirstOrDefault()!.Value);

                if (userId == 0) { return null!; }

                Entities.Task topTask = _dbContext.Tasks
                    .Where(task => task.Uid == userId && task.Type==false)
                    .OrderBy(task=>task.Tid)
                    .FirstOrDefault()!;
                TaskDTO result = _mapper.Map<TaskDTO>(topTask);
                
                return result;

            });

        }
    }
}

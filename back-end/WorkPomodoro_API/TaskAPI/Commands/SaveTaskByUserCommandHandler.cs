using AutoMapper;
using MediatR;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using WorkPomodoro_API.Context;
using WorkPomodoro_API.Entity;
using WorkPomodoro_API.TaskAPI.DTO;
using WorkPomodoro_API.Utilities;

namespace WorkPomodoro_API.TaskAPI.Commands
{
    public class SaveTaskByUserCommandHandler : IRequestHandler<SaveTaskByUserCommand, bool>
    {
        private readonly AccountUtils _utils;
        private WorkPomodoroDbContext _dbContext;
        private Mapper _mapper;
        public SaveTaskByUserCommandHandler(AccountUtils utils,WorkPomodoroDbContext workPomodoroDbContext) { 
            _utils = utils;
            _dbContext = workPomodoroDbContext;
            _mapper = MapperConfig.InitializeMapper();
        }   
        
        
        public Task<bool> Handle(SaveTaskByUserCommand request, CancellationToken cancellationToken)
        {
            return System.Threading.Tasks.Task.Run(() =>
            {
                string token = request.jwtToken!;
                List<TaskDTO> taskDTOs = request.createTaskDTO!;                
                string userId = _utils.getClaims(token).Where(eachClaim => eachClaim.Type == "UserId").
                                FirstOrDefault()!.Value;

                if (userId == null) { return false; }
                Account account = _dbContext.Accounts.FirstOrDefault(account => account.uid == userId)!; 
                if(account == null) { return false; }



                clearOldTasks(account);                
                addNewTasks(account, taskDTOs);
                               
              
                
                return true;

            });
            
        }       
        private void addNewTasks(Account account,List<TaskDTO> taskDTOs)
        {
            //Get the existing task list.
            List<Entity.Task> tempTaskList = new List<Entity.Task>();
            

            for (int index=0;index<taskDTOs.Count;index++)
            {

                TaskDTO taskDTO = taskDTOs[index];
                Entity.Task task = new Entity.Task();
                task = _mapper.Map<Entity.Task>(taskDTO);
                if (tempTaskList.IsNullOrEmpty())
                {
                    task.tid = "TAS00000";
                }
                else
                {
                    string prevId = tempTaskList[index - 1].tid!;
                    task.tid = _utils.idGenerator(prevId);
                }
                
                task.uid = account.uid;
                task.account = account;
                tempTaskList.Add(task);                
            }
            account.tasks = tempTaskList;
            _dbContext.SaveChanges();

        }
        private void clearOldTasks(Account account)
        {
            //Manually removes the existing tasks belong to an account in the Database, NOT the Account entity.
            List<Entity.Task> oldTaskList = _dbContext.Tasks.Where(task=>task.uid == account.uid).ToList();    
            foreach(Entity.Task task in oldTaskList)
            {
                _dbContext.Tasks.Remove(task);
            }
            _dbContext.SaveChanges();   

        }
    }
}

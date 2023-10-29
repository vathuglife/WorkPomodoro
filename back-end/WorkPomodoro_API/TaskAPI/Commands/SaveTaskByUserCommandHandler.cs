using AutoMapper;
using MediatR;
using Microsoft.IdentityModel.Tokens;
using WorkPomodoro_API.Entities;
using WorkPomodoro_API.TaskAPI.DTO;
using WorkPomodoro_API.Utilities;

namespace WorkPomodoro_API.TaskAPI.Commands
{
    public class SaveTaskByUserCommandHandler : IRequestHandler<SaveTaskByUserCommand, bool>
    {
        private readonly AccountUtils _utils;
        private WorkPomodoroContext _dbContext;
        private Mapper _mapper;
        public SaveTaskByUserCommandHandler(AccountUtils utils, WorkPomodoroContext WorkPomodoroContext)
        {
            _utils = utils;
            _dbContext = WorkPomodoroContext;
            _mapper = MapperConfig.InitializeMapper();
        }


        public Task<bool> Handle(SaveTaskByUserCommand request, CancellationToken cancellationToken)
        {
            return System.Threading.Tasks.Task.Run(() =>
            {
                string token = request.jwtToken!;
                List<TaskDTO> taskDTOs = request.createTaskDTO!;
                int userId = Int32.Parse(_utils.getClaims(token).Where(eachClaim => eachClaim.Type == "UserId").
                                FirstOrDefault()!.Value);

                if (userId == 0) { return false; }
                Account account = _dbContext.Accounts.FirstOrDefault(account => account.Uid == userId)!;
                if (account == null) { return false; }



                clearOldTasks(account);
                addNewTasks(account, taskDTOs);



                return true;

            });

        }

        private void addNewTasks(Account account, List<TaskDTO> taskDTOs)
        {
            //Get the existing task list.
            List<Entities.Task> tempTaskList = new List<Entities.Task>();


            for (int index = 0; index < taskDTOs.Count; index++)
            {

                TaskDTO taskDTO = taskDTOs[index];
                Entities.Task task = _mapper.Map<Entities.Task>(taskDTO);

                task.Uid = account.Uid;
                task.Account = account;
                tempTaskList.Add(task);
            }
            account.Tasks = tempTaskList;
            _dbContext.SaveChanges();

        }
        private void clearOldTasks(Account account)
        {
            //Manually removes the existing tasks belong to an account in the Database, NOT the Account entity.
            List<Entities.Task> oldTaskList = _dbContext.Tasks.Where(task => task.Uid == account.Uid).ToList();
            foreach (Entities.Task task in oldTaskList)
            {
                _dbContext.Tasks.Remove(task);
            }
            _dbContext.SaveChanges();

        }
    }
}

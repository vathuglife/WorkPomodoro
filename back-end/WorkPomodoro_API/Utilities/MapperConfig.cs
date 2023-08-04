using AutoMapper;
using WorkPomodoro_API.AccountAPI.DTO;
using WorkPomodoro_API.Entities;
using WorkPomodoro_API.MusicAPI.DTO;
using WorkPomodoro_API.TaskAPI.DTO;

namespace WorkPomodoro_API.Utilities
{
    public class MapperConfig
    {
        public static Mapper InitializeMapper()
        {
            //Provide all the Mapping Configuration
            var config = new MapperConfiguration(cfg =>
            {
                //Configuring User and UserDTO
                cfg.CreateMap<ReadAccountDTO, Account>();
                cfg.CreateMap<CreateAccountDTO, Account>();
                cfg.CreateMap<Account, CreateAccountDTO>();
                cfg.CreateMap<Account, ReadAccountDTO>();
                cfg.CreateMap<GetSongDTO, SongDTO>();
                cfg.CreateMap<TaskDTO, Entities.Task>();
                cfg.CreateMap<Entities.Task, TaskDTO>();
            });
            //Create an Instance of Mapper and return that Instance
            var mapper = new Mapper(config);
            return mapper;
        }
    }
}

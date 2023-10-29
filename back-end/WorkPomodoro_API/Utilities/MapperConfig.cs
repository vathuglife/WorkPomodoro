using AutoMapper;
using WorkPomodoro_API.AccountAPI.DTO;
using WorkPomodoro_API.Entities;
using WorkPomodoro_API.MusicAPI.DTO.Request;
using WorkPomodoro_API.MusicAPI.DTO.Response;
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
                cfg.CreateMap<UpdateAccountDTO, Account>();                
                cfg.CreateMap<Account, CreateAccountDTO>();
                cfg.CreateMap<Account, ReadAccountDTO>();
                cfg.CreateMap<NewSongDTO, PlaylistSongDTO>();
                cfg.CreateMap<NewSongDTO, Song>();
                cfg.CreateMap<Song, NewSongDTO>();
                cfg.CreateMap<PreviewSongDTO, Song>();
                cfg.CreateMap<PlaylistSongDTO, Song>();
                cfg.CreateMap<Song,PlaylistSongDTO>();
                cfg.CreateMap<Song, PreviewSongDTO>();
                cfg.CreateMap<TaskDTO, Entities.Task>();
                cfg.CreateMap<Entities.Task, TaskDTO>();
            });
            //Create an Instance of Mapper and return that Instance
            var mapper = new Mapper(config);
            return mapper;
        }
    }
}

using AutoMapper;
using WorkPomodoro_API.DTO;
using WorkPomodoro_API.Entity;

namespace WorkPomodoro_API.Service
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
            });
            //Create an Instance of Mapper and return that Instance
            var mapper = new Mapper(config);
            return mapper;
        }
    }
}

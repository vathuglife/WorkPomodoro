using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Text;
using WorkPomodoro_API.AccountAPI.Queries.GetAccountDetails;
using WorkPomodoro_API.MusicAPI.DTO;

using WorkPomodoro_API.MusicAPI.SSE;
using WorkPomodoro_API.Utilities;

namespace WorkPomodoro_API.MusicAPI.Controllers
{
    public class MusicQueryController : Controller
    {
        private readonly IMediator _mediator;

        //Automatically injects an instance/existance of Mediator into this Controller.
        //This is handled by the Mediator Dependency Injector installed in the package.
        public MusicQueryController(IMediator mediator)
        {
            _mediator = mediator;
        }



        [HttpPost]
        [Route("workpomodoro/music/download")]        
        [Authorize]
        public async Task<IActionResult> DownloadSong([FromBody] GetSongDTO getSongDTO)
        {
            string url = getSongDTO.url!;
            string base64file= await YTToMp3.GetMP3(url);
            if (base64file == null)
            {
                return BadRequest("Something Went wrong.");
            }
            var mapper = MapperConfig.InitializeMapper();

            SongDTO result = mapper.Map<SongDTO>(getSongDTO);
            result.audioBase64 = base64file;

            return Ok(result);
        }
        [HttpGet]
        [Route("workpomodoro/music/download/progress")]
        [Authorize]
        public async Task GetDownloadProgress()
        {
            await HttpContext.SSEInitAsync();
            Thread.Sleep(1000); //Delay between each write into the HttpContext.
            await HttpContext.GetProgress();

        }
    }
}

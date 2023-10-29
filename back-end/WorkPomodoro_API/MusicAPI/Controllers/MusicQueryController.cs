using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Net.Http.Headers;
using System.Text;
using WorkPomodoro_API.AccountAPI.Queries.GetAccountDetails;
using WorkPomodoro_API.MusicAPI.Commands.AddSongToPlaylist;
using WorkPomodoro_API.MusicAPI.DTO;
using WorkPomodoro_API.MusicAPI.DTO.Request;
using WorkPomodoro_API.MusicAPI.DTO.Response;
using WorkPomodoro_API.MusicAPI.Queries.GetFullSongList;
using WorkPomodoro_API.MusicAPI.Queries.GetPlaylistSongs;
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
        
        
        [HttpGet]
        [Route("workpomodoro/music/preview")]
        [Authorize]
        public async Task<IActionResult> GetPreviewSongs()
        {
            string? rawToken = Request.Headers[HeaderNames.Authorization].ToString().Remove(0, 7);
            GetPreviewSongsQuery getPreviewSongsQuery = new GetPreviewSongsQuery();
            getPreviewSongsQuery.token = rawToken;
            List<PreviewSongDTO> result = await _mediator.Send(getPreviewSongsQuery);
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


        [HttpPost]
        [Route("workpomodoro/music/playlist/all")]
        [Authorize]
        public async Task<IActionResult> GetPlaylistSongs([FromBody] List<RequestToPlaylistSongDTO> requestToPlaylistSongDTOs)
        {

            string? rawToken = Request.Headers[HeaderNames.Authorization].ToString().Remove(0, 7);
            GetPlaylistSongsQuery getPlaylistSongsQuery = new GetPlaylistSongsQuery();
            getPlaylistSongsQuery.songPlaylists = requestToPlaylistSongDTOs;
            getPlaylistSongsQuery.token = rawToken;
            
            var result = await _mediator.Send(getPlaylistSongsQuery);
            return Ok(result);
        }
    }
}

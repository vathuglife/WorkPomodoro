using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Net.Http.Headers;
using WorkPomodoro_API.MusicAPI.Commands.AddSongToPlaylist;
using WorkPomodoro_API.MusicAPI.Commands.RemoveSongFromPlaylist;
using WorkPomodoro_API.MusicAPI.Commands.SaveSongToDb;
using WorkPomodoro_API.MusicAPI.DTO.Request;
using WorkPomodoro_API.Utilities;

namespace WorkPomodoro_API.MusicAPI.Controllers
{
    public class MusicCommandController : Controller
    {
        private readonly IMediator _mediator;

        public MusicCommandController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        [Route("workpomodoro/music/download")]
        [Authorize]
        public async Task<IActionResult> DownloadSong([FromBody] NewSongDTO getSongDTO)
        {
            string url = getSongDTO.Url!;
            string? rawToken = Request.Headers[HeaderNames.Authorization].ToString().Remove(0, 7);
            
            SaveSongToDbCommand saveSongToDbCommand = new SaveSongToDbCommand();
            saveSongToDbCommand.url = url;
            saveSongToDbCommand.token = rawToken;
            saveSongToDbCommand.SongDTO = getSongDTO;   
            var result = await _mediator.Send(saveSongToDbCommand);                        
            return Ok(result);
        }


        [HttpPost]
        [Route("workpomodoro/music/playlist/add")]
        [Authorize]
        public async Task<IActionResult> AddToPlaylist([FromBody] NewSongDTO getSongDTO)
        {
            string url = getSongDTO.Url!;
            string? rawToken = Request.Headers[HeaderNames.Authorization].ToString().Remove(0, 7);

            AddSongToPlaylistCommand addSongToPlayListCommand = new AddSongToPlaylistCommand();            
            addSongToPlayListCommand.token = rawToken;
            addSongToPlayListCommand.newSongDTO = getSongDTO;
            var result = await _mediator.Send(addSongToPlayListCommand);
            return Ok(result);
        }


        [HttpPost]
        [Route("workpomodoro/music/playlist/remove")]
        [Authorize]
        public async Task<IActionResult> RemoveFromPlaylist([FromBody] RemoveSongDTO removeSongDTO)
        {            
            string? rawToken = Request.Headers[HeaderNames.Authorization].ToString().Remove(0, 7);

            RemoveSongFromPlaylistCommand removeSongFromPlaylistCommand= new RemoveSongFromPlaylistCommand();
            removeSongFromPlaylistCommand.removeSongDTO = removeSongDTO;
            removeSongFromPlaylistCommand.token = rawToken;
            var result = await _mediator.Send(removeSongFromPlaylistCommand);
            return Ok(result);
        }


    }
}

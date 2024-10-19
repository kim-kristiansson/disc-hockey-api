using DiscHockey.Api.Dtos;
using DiscHockey.Api.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using SpotifyAPI.Web;

namespace DiscHockey.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GameMusicSetController(IGameMusicSetService gameMusicSetService, IUserService userService) :ControllerBase
    {
        public async Task<IActionResult> Index([FromBody] RequestDtoGameMusicSet requestDtoGameMusicSet)
        {
            if (HttpContext.Items["SpotifyUser"] is not PrivateUser spotifyUser)
            {
                return Unauthorized("User is not authorized with Spotify");
            }

            var user = await userService.FindOrCreateUser(spotifyUser, string.Empty);

            var gameMusicSet = gameMusicSetService.GetGameMusicSetAsync(requestDtoGameMusicSet, user.Id);

            return Ok(gameMusicSet);
        }
    }
}

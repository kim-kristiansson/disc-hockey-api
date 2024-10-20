using DiscHockey.Api.Attributes;
using DiscHockey.Api.Dtos;
using DiscHockey.Api.Repositories.Interfaces;
using DiscHockey.Api.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using SpotifyAPI.Web;

namespace DiscHockey.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GameMusicSetController(IGameMusicSetService gameMusicSetService, IUserRepository userRepository) :ControllerBase
    {
        [HttpPost]
        [SpotifyAuthorize]
        public async Task<IActionResult> CreateGameMusicSet([FromBody] RequestDtoGameMusicSet requestDtoGameMusicSet)
        {
            if (HttpContext.Items["SpotifyUser"] is not PrivateUser spotifyUser)
            {
                return Unauthorized("User is not authorized with Spotify");
            }

            var user = await userRepository.FindUserBySpotifyIdAsync(spotifyUser.Id);

            if (user == null)
            {
                return NotFound("User not found");
            }

            var gameMusicSet = await gameMusicSetService.CreateGameMusicSetAsync(requestDtoGameMusicSet, user.Id);

            return Ok(gameMusicSet);
        }
    }
}

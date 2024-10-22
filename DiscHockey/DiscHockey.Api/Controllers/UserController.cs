using DiscHockey.Api.Attributes;
using DiscHockey.Api.Mappers;
using DiscHockey.Api.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;
using SpotifyAPI.Web;

namespace DiscHockey.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController(IUserRepository userRepository, Mapper mapper) :ControllerBase
    {
        [HttpGet("me")]
        [SpotifyAuthorize]
        public async Task<IActionResult> GetUser()
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

            var userDto = mapper.MapToDto(user);

            return Ok(userDto);
        }
    }
}

using DiscHockey.Api.Attributes;
using DiscHockey.Api.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;
using SpotifyAPI.Web;

namespace DiscHockey.Api.Data
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController(IUserRepository userRepository) : ControllerBase
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

            return Ok(user);
        }
    }
}

using DiscHockey.Api.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace DiscHockey.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SpotifyController :ControllerBase
    {
        private readonly ISpotifyService _spotifyService;
        private readonly IUserService _userService;

        public SpotifyController(ISpotifyService spotifyService, IUserService userService)
        {
            _spotifyService = spotifyService;
            _userService = userService;
        }

        [HttpGet("login")]
        public IActionResult Login()
        {
            var loginUrl = _spotifyService.GetSpotifyLoginUrl();
            return Redirect(loginUrl);
        }

        [HttpGet("callback")]
        public async Task<IActionResult> Callback(string code)
        {
            if (string.IsNullOrEmpty(code))
            {
                return BadRequest("Code is required");
            }

            try
            {
                var tokenResponse = await _spotifyService.ExchangeCodeForTokenAsync(code);

                var spotifyUser = await _spotifyService.GetCurrentUserAsync(tokenResponse.AccessToken);

                var user = await _userService.FindOrCreateUser(spotifyUser, tokenResponse.RefreshToken);

                return Ok(user);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}

using DiscHockey.Api.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace DiscHockey.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SpotifyController(ISpotifyService spotifyService, IUserService userService, IConfiguration configuration) :ControllerBase
    {
        [HttpGet("login")]
        public IActionResult Login()
        {
            var loginUrl = spotifyService.GetSpotifyLoginUrl();
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
                var tokenResponse = await spotifyService.ExchangeCodeForTokenAsync(code);

                var spotifyUser = await spotifyService.GetCurrentUserAsync(tokenResponse.AccessToken);

                if (spotifyUser == null)
                {
                    return BadRequest("Invalid Spotify token");
                }

                var user = await userService.FindOrCreateUser(spotifyUser, tokenResponse.RefreshToken);

                Response.Cookies.Append("spotifyAccessToken", tokenResponse.AccessToken, new CookieOptions
                {
                    HttpOnly = true,
                    Secure = true,
                    Expires = DateTimeOffset.UtcNow.AddHours(1)
                });

                var frontendRedirectUrl = configuration["Spotify:FrontendRedirectUrl"];

                if (string.IsNullOrEmpty(frontendRedirectUrl))
                {
                    throw new Exception("Frontend redirect URL is required");
                }

                return Redirect(frontendRedirectUrl);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}

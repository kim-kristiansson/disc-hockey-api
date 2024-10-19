using DiscHockey.Api.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace DiscHockey.Api.Attributes
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
    public class SpotifyAuthorizeAttribute :Attribute, IAsyncActionFilter
    {
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var spotifyService = context.HttpContext.RequestServices.GetService<ISpotifyService>();

            var token = context.HttpContext.Request.Headers["Authorization"].ToString().Replace("Bearer ", "");

            if (string.IsNullOrEmpty(token))
            {
                context.Result = new UnauthorizedObjectResult("Unauthorized: Missing Spotify token");
                return;
            }

            try
            {
                if (spotifyService == null)
                {
                    context.Result = new StatusCodeResult(500);
                    return;
                }

                var spotifyUser = await spotifyService.GetCurrentUserAsync(token);

                if (spotifyUser == null)
                {
                    context.Result = new UnauthorizedObjectResult("Unauthorized: Invalid Spotify token");
                    return;
                }

                context.HttpContext.Items["SpotifyUser"] = spotifyUser;

                await next();
            }
            catch (Exception)
            {
                context.Result = new StatusCodeResult(500);
            }
        }
    }
}

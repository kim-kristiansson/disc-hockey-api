using SpotifyAPI.Web;

namespace DiscHockey.Api.Services.Interfaces
{
    public interface ISpotifyService
    {
        string GetSpotifyLoginUrl();
        Task<AuthorizationCodeTokenResponse> ExchangeCodeForTokenAsync(string code);
        Task<PrivateUser> GetCurrentUserAsync(string accessToken);
    }
}

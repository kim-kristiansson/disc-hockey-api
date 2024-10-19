using DiscHockey.Api.Services.Interfaces;
using SpotifyAPI.Web;

namespace DiscHockey.Api.Services
{
    public class SpotifyService(string clientId, string clientSecret, string redirectUri) :ISpotifyService
    {
        private readonly string _clientId = clientId;
        private readonly string _clientSecret = clientSecret;
        private readonly string _redirectUri = redirectUri;

        private SpotifyClient? _spotifyClient;

        public async Task<AuthorizationCodeTokenResponse> ExchangeCodeForTokenAsync(string code)
        {
            return await new OAuthClient().RequestToken(
                new AuthorizationCodeTokenRequest(_clientId, _clientSecret, code, new Uri(_redirectUri)));
        }

        public async Task<PrivateUser?> GetCurrentUserAsync(string accessToken)
        {
            try
            {
                _spotifyClient = new SpotifyClient(accessToken);

                var user = await _spotifyClient.UserProfile.Current();

                return user;
            }
            catch (Exception)
            {
                return null;
            }
        }

        public string GetSpotifyLoginUrl()
        {
            var loginRequest = new LoginRequest(new Uri(_redirectUri), _clientId, LoginRequest.ResponseType.Code)
            {
                Scope = [Scopes.UserReadEmail, Scopes.UserReadPrivate]
            };
            return loginRequest.ToUri().ToString();
        }
    }
}

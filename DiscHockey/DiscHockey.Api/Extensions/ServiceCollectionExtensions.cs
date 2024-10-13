using DiscHockey.Api.Services;
using DiscHockey.Api.Services.Interfaces;

namespace DiscHockey.Api.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddSpotifyService(this IServiceCollection services, IConfiguration configuration)
        {
            var spotifyConfig = configuration.GetSection("Spotify");

            var clientId = spotifyConfig["ClientId"] ?? throw new ArgumentNullException("Spotify ClientId is missing");
            var clientSecret = spotifyConfig["ClientSecret"] ?? throw new ArgumentNullException("Spotify ClientSecret is missing");
            var redirectUri = spotifyConfig["RedirectUri"] ?? throw new ArgumentNullException("Spotify RedirectUri is missing");

            services.AddSingleton<ISpotifyService, SpotifyService>(sp =>
                new SpotifyService(clientId, clientSecret, redirectUri)
            );

            return services;
        }
    }
}

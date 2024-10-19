using DiscHockey.Api.Models;

namespace DiscHockey.Api.Repositories.Interfaces
{
    public interface IUserRepository
    {
        Task<User?> FindUserBySpotifyAsyncId(string spotifyId);
    }
}

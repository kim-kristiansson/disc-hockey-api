using DiscHockey.Api.Models;

namespace DiscHockey.Api.Repositories.Interfaces
{
    public interface IUserRepository :IBaseRepository<User>
    {
        Task<User?> FindUserBySpotifyIdAsync(string spotifyId);
    }
}

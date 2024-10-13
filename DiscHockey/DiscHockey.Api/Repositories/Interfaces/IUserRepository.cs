using DiscHockey.Api.Models;

namespace DiscHockey.Api.Repositories.Interfaces
{
    public interface IUserRepository
    {
        Task AddUserAsync(User user);
        Task<User?> FindUserBySpotifyAsyncId(string spotifyId);
        Task<bool> SaveChangesAsync();
        void UpdateUser(User user);
    }
}

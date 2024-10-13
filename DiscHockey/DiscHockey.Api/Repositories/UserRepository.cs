using DiscHockey.Api.Data;
using DiscHockey.Api.Models;
using DiscHockey.Api.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DiscHockey.Api.Repositories
{
    public class UserRepository(AppDbContext _appDbContext) :IUserRepository
    {
        public async Task AddUserAsync(User user)
        {
            ArgumentNullException.ThrowIfNull(user);

            await _appDbContext.Users.AddAsync(user);
        }

        public async Task<User?> FindUserBySpotifyAsyncId(string spotifyId)
        {
            if (string.IsNullOrEmpty(spotifyId))
            {
                throw new ArgumentNullException(nameof(spotifyId));
            }

            return await _appDbContext.Users.FirstOrDefaultAsync(u => u.SpotifyId == spotifyId);
        }

        public async Task<bool> SaveChangesAsync()
        {
            return await _appDbContext.SaveChangesAsync() > 0;
        }

        public void UpdateUser(User user)
        {
            ArgumentNullException.ThrowIfNull(user);

            _appDbContext.Users.Update(user);
        }
    }
}

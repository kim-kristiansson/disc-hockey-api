using DiscHockey.Api.Data;
using DiscHockey.Api.Models;
using DiscHockey.Api.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DiscHockey.Api.Repositories
{
    public class UserRepository(AppDbContext appDbContext) :BaseRepository<User>(appDbContext), IUserRepository
    {
        public async Task<User?> FindUserBySpotifyIdAsync(string spotifyId)
        {
            if (string.IsNullOrEmpty(spotifyId))
            {
                throw new ArgumentNullException(nameof(spotifyId));
            }

            return await _context.Users.FirstOrDefaultAsync(u => u.SpotifyId == spotifyId);
        }
    }
}

using DiscHockey.Api.Data;
using DiscHockey.Api.Models;
using DiscHockey.Api.Repositories.Interfaces;

namespace DiscHockey.Api.Repositories
{
    public class TrackRepository(AppDbContext appDbContext) :BaseRepository<Track>(appDbContext), ITrackRepository
    {
    }
}

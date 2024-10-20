using DiscHockey.Api.Data;
using DiscHockey.Api.Models;
using DiscHockey.Api.Repositories.Interfaces;

namespace DiscHockey.Api.Repositories
{
    public class PlaylistRepository(AppDbContext appDbContext) :BaseRepository<Playlist>(appDbContext), IPlaylistRepository
    {
    }
}

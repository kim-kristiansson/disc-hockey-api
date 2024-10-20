using DiscHockey.Api.Data;
using DiscHockey.Api.Models;
using DiscHockey.Api.Repositories.Interfaces;

namespace DiscHockey.Api.Repositories
{
    public class GameMusicSetRepository(AppDbContext appDbContext) :BaseRepository<GameMusicSet>(appDbContext), IGameMusicSetRepository
    {

    }
}

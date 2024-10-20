using DiscHockey.Api.Dtos;
using DiscHockey.Api.Models;

namespace DiscHockey.Api.Services.Interfaces
{
    public interface IGameMusicSetService
    {
        Task<GameMusicSet> CreateGameMusicSetAsync(RequestDtoGameMusicSet requestDtoGameMusicSet, Guid userId);
    }
}

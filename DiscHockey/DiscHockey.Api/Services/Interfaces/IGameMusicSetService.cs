using DiscHockey.Api.Dtos;
using DiscHockey.Api.Models;

namespace DiscHockey.Api.Services.Interfaces
{
    public interface IGameMusicSetService
    {
        GameMusicSet GetGameMusicSetAsync(RequestDtoGameMusicSet requestDtoGameMusicSet, Guid userId);
    }
}

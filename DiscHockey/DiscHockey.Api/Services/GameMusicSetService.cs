using DiscHockey.Api.Dtos;
using DiscHockey.Api.Models;
using DiscHockey.Api.Repositories.Interfaces;
using DiscHockey.Api.Services.Interfaces;

namespace DiscHockey.Api.Services
{
    public class GameMusicSetService(IPlaylistRepository playlistRepository, IGameMusicSetRepository gameMusicSetRepository) :IGameMusicSetService
    {
        public async Task<GameMusicSet> CreateGameMusicSetAsync(RequestDtoGameMusicSet requestDtoGameMusicSet, Guid userId)
        {
            var gamePlayList = await playlistRepository.AddAsync(new());
            var warmupPlayList = await playlistRepository.AddAsync(new());
            var penaltyPlayList = await playlistRepository.AddAsync(new());

            var gameMusicSet = new GameMusicSet
            {
                Id = Guid.NewGuid(),
                Name = requestDtoGameMusicSet.Name,
                GamePlaylist = gamePlayList,
                WarmupPlaylist = warmupPlayList,
                PenaltyPlaylist = penaltyPlayList,
                UserId = userId
            };

            await gameMusicSetRepository.AddAsync(gameMusicSet);
            await gameMusicSetRepository.SaveChangesAsync();

            return gameMusicSet;
        }
    }
}

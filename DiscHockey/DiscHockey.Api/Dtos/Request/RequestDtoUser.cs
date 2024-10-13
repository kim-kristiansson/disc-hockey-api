using System.ComponentModel.DataAnnotations;

namespace DiscHockey.Api.Dtos
{
    public class RequestDtoUser
    {
        [Required]
        public string SpotifyId { get; set; } = "";
        public List<RequestDtoGameMusicSet> GameSoundSets { get; set; } = [];
    }
}

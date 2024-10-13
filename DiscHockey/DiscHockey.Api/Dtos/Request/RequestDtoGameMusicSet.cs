using System.ComponentModel.DataAnnotations;

namespace DiscHockey.Api.Dtos
{
    public class RequestDtoGameMusicSet
    {
        [Required]
        public string Name { get; set; } = "";
        public RequestDtoPlaylist? GamePlaylist { get; set; }
        public RequestDtoPlaylist? WarmupPlaylist { get; set; }
        public RequestDtoPlaylist? PenaltyPlaylist { get; set; }
        public RequestDtoTrack? HomeTeamGoalTrack { get; set; }
        public RequestDtoTrack? AwayTeamGoalTrack { get; set; }
    }
}

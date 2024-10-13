using System.ComponentModel.DataAnnotations;

namespace DiscHockey.Api.Dtos.Responses
{
    public class ResponseDtoGameMusicSet
    {
        public Guid Id { get; set; }
        [Required]
        public string Name { get; set; } = "";
        public ResponseDtoPlaylist? GamePlaylist { get; set; }
        public ResponseDtoPlaylist? WarmupPlaylist { get; set; }
        public ResponseDtoPlaylist? PenaltyPlaylist { get; set; }
        public ResponseDtoTrack? HomeTeamGoalTrack { get; set; }
        public ResponseDtoTrack? AwayTeamGoalTrack { get; set; }
    }
}

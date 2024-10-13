namespace DiscHockey.Api.Models
{
    public class GameMusicSet
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = "";

        // Foreign keys for playlists
        public Guid GamePlaylistId { get; set; }
        public Playlist? GamePlaylist { get; set; }

        public Guid WarmupPlaylistId { get; set; }
        public Playlist? WarmupPlaylist { get; set; }

        public Guid PenaltyPlaylistId { get; set; }
        public Playlist? PenaltyPlaylist { get; set; }

        // Foreign keys for goal tracks
        public Guid HomeTeamGoalTrackId { get; set; }  // Add the property here
        public Track? HomeTeamGoalTrack { get; set; }  // Add the navigation property

        public Guid AwayTeamGoalTrackId { get; set; }  // Add the property here
        public Track? AwayTeamGoalTrack { get; set; }  // Add the navigation property

        public Guid UserId { get; set; }
        public User? User { get; set; }
    }
}

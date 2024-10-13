namespace DiscHockey.Api.Models
{
    public class Track
    {
        public Guid Id { get; set; }
        public string SpotifyId { get; set; } = "";
        public ICollection<TrackSegment> TrackSegments { get; set; } = [];
        public Guid PlaylistId { get; set; }
        public Playlist? Playlist { get; set; }
        public Guid GameMusicSetId { get; set; }
        public GameMusicSet? GameMusicSet { get; set; }
    }
}
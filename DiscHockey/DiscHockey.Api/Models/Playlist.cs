namespace DiscHockey.Api.Models
{
    public class Playlist
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = "";
        public ICollection<Track> Tracks { get; set; } = new List<Track>();
    }

}

namespace DiscHockey.Api.Models
{
    public class User
    {
        public Guid Id { get; set; }
        public string SpotifyId { get; set; } = "";
        public string RefreshToken { get; set; } = "";
        public ICollection<GameMusicSet> GameMusicSets { get; set; } = [];
    }
}

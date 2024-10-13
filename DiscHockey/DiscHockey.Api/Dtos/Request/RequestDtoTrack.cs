namespace DiscHockey.Api.Dtos
{
    public class RequestDtoTrack
    {
        public string SpotifyId { get; set; } = "";
        public List<RequestDtoTrackSegment> Points { get; set; } = [];
    }
}
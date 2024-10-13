namespace DiscHockey.Api.Models
{
    public class TrackSegment
    {
        public Guid Id { get; set; }
        public Guid TrackId { get; set; }
        public Track? Track { get; set; }
        public int StartPoint { get; set; }
        public int EndPoint { get; set; }
    }
}

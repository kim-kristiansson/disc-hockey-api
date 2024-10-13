namespace DiscHockey.Api.Dtos.Responses
{
    public class ResponseDtoPlaylist
    {
        public string Name { get; set; } = "";
        public List<ResponseDtoTrack> Tracks { get; set; } = [];
    }
}
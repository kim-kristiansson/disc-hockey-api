using System.ComponentModel.DataAnnotations;

namespace DiscHockey.Api.Dtos
{
    public class RequestDtoPlaylist
    {
        [Required]
        public string Name { get; set; } = "";
        public List<RequestDtoTrack> Tracks { get; set; } = [];
    }
}
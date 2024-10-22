using DiscHockey.Api.Dtos.Responses;
using DiscHockey.Api.Models;
using Riok.Mapperly.Abstractions;

namespace DiscHockey.Api.Mappers
{
    [Mapper]
    public partial class Mapper
    {
        public partial ResponseDtoUser MapToDto(User user);
    }
}

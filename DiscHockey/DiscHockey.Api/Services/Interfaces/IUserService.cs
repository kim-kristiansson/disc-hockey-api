using DiscHockey.Api.Models;
using SpotifyAPI.Web;

namespace DiscHockey.Api.Services.Interfaces
{
    public interface IUserService
    {
        Task<User> FindOrCreateUser(PrivateUser privateUser, string refreshToken);
    }
}

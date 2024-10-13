using DiscHockey.Api.Models;
using DiscHockey.Api.Repositories.Interfaces;
using DiscHockey.Api.Services.Interfaces;
using SpotifyAPI.Web;

namespace DiscHockey.Api.Services
{
    public class UserService(IUserRepository _userRepository) :IUserService
    {
        public async Task<User> FindOrCreateUser(PrivateUser privateUser, string refreshToken)
        {
            var user = await _userRepository.FindUserBySpotifyAsyncId(privateUser.Id);

            if (user == null)
            {
                user = new User
                {
                    Id = Guid.NewGuid(),
                    SpotifyId = privateUser.Id,
                    RefreshToken = refreshToken
                };

                await _userRepository.AddUserAsync(user);
            }
            else
            {
                user.RefreshToken = refreshToken;
                _userRepository.UpdateUser(user);
            }

            if (!await _userRepository.SaveChangesAsync())
            {
                throw new Exception("Failed to save user");
            }

            return user;
        }
    }
}

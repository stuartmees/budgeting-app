using BudgetingApp.Models.Entities;
using BudgetingApp.Repositories.Interfaces;
using BudgetingApp.Services.Interfaces;

namespace BudgetingApp.Services;

public class UsersService : IUsersService
{
    private readonly IUsersRepository _usersRepository;

    public UsersService(IUsersRepository usersRepository)
    {
        _usersRepository = usersRepository;
    }

    public async Task<User?> GetByIdAsync(int id)
    {
        return await _usersRepository.GetByIdAsync(id);
    }

    public async Task<User?> GetByOktaIdAsync(string oktaId)
    {
        return await _usersRepository.GetByOktaIdAsync(oktaId);
    }

    public async Task<User?> GetByAuth0IdAsync(string auth0Id)
    {
        // Auth0 ID is stored in the okta_id column (generic external auth ID)
        return await _usersRepository.GetByOktaIdAsync(auth0Id);
    }

    public async Task<User?> GetByEmailAsync(string email)
    {
        return await _usersRepository.GetByEmailAsync(email);
    }

    public async Task<User> CreateUserAsync(string oktaId, string email, string? displayName)
    {
        var user = new User
        {
            OktaId = oktaId,
            Email = email,
            DisplayName = displayName
        };
        return await _usersRepository.CreateAsync(user);
    }

    public async Task<User> UpdateAsync(User user)
    {
        return await _usersRepository.UpdateAsync(user);
    }

    public async Task<bool> DeleteAsync(int id)
    {
        return await _usersRepository.DeleteAsync(id);
    }
}

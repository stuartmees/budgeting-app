using BudgetingApp.Models.Entities;

namespace BudgetingApp.Services.Interfaces;

public interface IUsersService
{
    Task<User?> GetByIdAsync(int id);
    Task<User?> GetByOktaIdAsync(string oktaId);
    Task<User?> GetByAuth0IdAsync(string auth0Id);
    Task<User?> GetByEmailAsync(string email);
    Task<User> CreateUserAsync(string oktaId, string email, string? displayName);
    Task<User> UpdateAsync(User user);
    Task<bool> DeleteAsync(int id);
}

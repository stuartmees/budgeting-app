using BudgetingApp.Models;

namespace BudgetingApp.Services;

public interface IUsersService
{
    Task<User?> GetByIdAsync(int id);
    Task<User?> GetByOktaIdAsync(string oktaId);
    Task<User?> GetByEmailAsync(string email);
    Task<User> CreateUserAsync(string oktaId, string email, string? displayName);
    Task<User> UpdateAsync(User user);
    Task<bool> DeleteAsync(int id);
}

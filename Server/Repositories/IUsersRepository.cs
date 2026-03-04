using BudgetingApp.Models;

namespace BudgetingApp.Repositories;

public interface IUsersRepository
{
    Task<User?> GetByIdAsync(int id);
    Task<User?> GetByOktaIdAsync(string oktaId);
    Task<User?> GetByEmailAsync(string email);
    Task<User> CreateAsync(User user);
    Task<User> UpdateAsync(User user);
    Task<bool> DeleteAsync(int id);
}

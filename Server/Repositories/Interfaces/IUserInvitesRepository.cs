using BudgetingApp.Models.Entities;

namespace BudgetingApp.Repositories.Interfaces;

public interface IUserInvitesRepository
{
    Task<UserInvite?> GetByIdAsync(int id);
    Task<UserInvite?> GetByEmailAndCodeAsync(string email, string inviteCode);
    Task<bool> MarkCodeValidatedAsync(int id);
    Task<bool> MarkAsUsedAsync(int id);
}

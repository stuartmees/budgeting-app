using BudgetingApp.Models.Entities;

namespace BudgetingApp.Repositories.Interfaces;

public interface ISignUpInvitesRepository
{
    Task<SignUpInvite?> GetByIdAsync(int id);
    Task<SignUpInvite?> GetByEmailAndCodeAsync(string email, string code);
    Task<bool> MarkAsUsedAsync(int id);
}

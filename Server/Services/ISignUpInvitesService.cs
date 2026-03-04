using BudgetingApp.Models;

namespace BudgetingApp.Services;

public interface ISignUpInvitesService
{
    Task<SignUpInvite?> ValidateInviteAsync(string email, string code);
    Task<bool> MarkInviteAsUsedAsync(int id);
}

using BudgetingApp.Models.Entities;

namespace BudgetingApp.Services.Interfaces;

public interface ISignUpInvitesService
{
    Task<SignUpInvite?> ValidateInviteAsync(string email, string code);
    Task<bool> MarkInviteAsUsedAsync(int id);
}

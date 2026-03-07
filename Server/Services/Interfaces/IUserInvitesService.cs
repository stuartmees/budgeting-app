using BudgetingApp.Models.Entities;

namespace BudgetingApp.Services.Interfaces;

public interface IUserInvitesService
{
    Task<UserInvite?> ValidateInviteAsync(string email, string inviteCode);
    Task<bool> HasPendingValidationAsync(string email);
    Task<bool> MarkCodeValidatedAsync(int id);
    Task<bool> MarkInviteAsUsedAsync(int id);
}

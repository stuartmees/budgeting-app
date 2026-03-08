using BudgetingApp.Models.Entities;

namespace BudgetingApp.Services.Interfaces;

public interface IUserInvitesService
{
    Task<UserInvite?> ValidateInviteAsync(string email, string inviteCode);
    Task<bool> GetIsPendingAsync(int id);
    Task<bool> MarkCodeValidatedAsync(int id);
    Task<bool> MarkInviteAsUsedAsync(int id);
}

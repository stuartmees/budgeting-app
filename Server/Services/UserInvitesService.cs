using BudgetingApp.Models.Entities;
using BudgetingApp.Repositories.Interfaces;
using BudgetingApp.Services.Interfaces;

namespace BudgetingApp.Services;

public class UserInvitesService : IUserInvitesService
{
    private readonly IUserInvitesRepository _userInvitesRepository;

    public UserInvitesService(IUserInvitesRepository userInvitesRepository)
    {
        _userInvitesRepository = userInvitesRepository;
    }

    public async Task<UserInvite?> ValidateInviteAsync(string email, string inviteCode)
    {
        return await _userInvitesRepository.GetByEmailAndCodeAsync(email, inviteCode);
    }

    public async Task<bool> HasPendingValidationAsync(string email)
    {
        var invite = await _userInvitesRepository.GetPendingByEmailAsync(email);
        return invite != null;
    }

    public async Task<bool> MarkCodeValidatedAsync(int id)
    {
        return await _userInvitesRepository.MarkCodeValidatedAsync(id);
    }

    public async Task<bool> MarkInviteAsUsedAsync(int id)
    {
        return await _userInvitesRepository.MarkAsUsedAsync(id);
    }
}

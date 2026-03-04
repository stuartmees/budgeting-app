using BudgetingApp.Models;
using BudgetingApp.Repositories;

namespace BudgetingApp.Services;

public class SignUpInvitesService : ISignUpInvitesService
{
    private readonly ISignUpInvitesRepository _signUpInvitesRepository;

    public SignUpInvitesService(ISignUpInvitesRepository signUpInvitesRepository)
    {
        _signUpInvitesRepository = signUpInvitesRepository;
    }

    public async Task<SignUpInvite?> ValidateInviteAsync(string email, string code)
    {
        return await _signUpInvitesRepository.GetByEmailAndCodeAsync(email, code);
    }

    public async Task<bool> MarkInviteAsUsedAsync(int id)
    {
        return await _signUpInvitesRepository.MarkAsUsedAsync(id);
    }
}

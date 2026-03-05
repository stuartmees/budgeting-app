using BudgetingApp.Models.Entities;
using BudgetingApp.Repositories.Interfaces;
using BudgetingApp.Services.Interfaces;

namespace BudgetingApp.Services;

public class ViewsService : IViewsService
{
    private readonly IUsersRepository _usersRepository;

    public ViewsService(IUsersRepository usersRepository)
    {
        _usersRepository = usersRepository;
    }

    public async Task<User?> GetHomepageAsync(int userId)
    {
        // TODO: Fetch user's budgets, months, weekly summaries etc. to return to homepage to display eventually
        var user = await _usersRepository.GetByIdAsync(userId);
        return user;
    }
}

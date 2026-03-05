using BudgetingApp.Models.Entities;

namespace BudgetingApp.Services.Interfaces;

public interface IViewsService
{
    Task<User?> GetHomepageAsync(int userId);
}

using BudgetingApp.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace BudgetingApp.Controllers;

[ApiController]
[Route("api/views")]
public class ViewsController : ControllerBase
{
    private readonly IViewsService _viewsService;

    public ViewsController(IViewsService viewsService)
    {
        _viewsService = viewsService;
    }

    [HttpGet("homepage/{userId}")]
    public async Task<IActionResult> GetHomepage(int userId)
    {
        var user = await _viewsService.GetHomepageAsync(userId);
        if (user == null)
            return NotFound(new { error = "User not found" });

        return Ok(user);
    }
}

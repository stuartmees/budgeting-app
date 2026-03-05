using BudgetingApp.Models.DTOs.Requests;
using BudgetingApp.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace BudgetingApp.Controllers;

[ApiController]
[Route("api/users")]
public class UsersController : ControllerBase
{
    private readonly IUsersService _usersService;
    private readonly ISignUpInvitesService _signUpInvitesService;

    public UsersController(IUsersService usersService, ISignUpInvitesService signUpInvitesService)
    {
        _usersService = usersService;
        _signUpInvitesService = signUpInvitesService;
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var user = await _usersService.GetByIdAsync(id);
        if (user == null)
            return NotFound(new { error = "User not found" });

        return Ok(user);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateUserRequest request)
    {
        // Check if user already exists
        var existingUser = await _usersService.GetByAuth0IdAsync(request.Auth0Id);
        if (existingUser != null)
        {
            return Ok(new { user = existingUser, isNew = false });
        }

        // Validate invite
        var invite = await _signUpInvitesService.ValidateInviteAsync(request.Email, request.InviteCode);
        if (invite == null)
            return BadRequest(new { error = "Invalid or expired invite" });

        // Create user
        var user = await _usersService.CreateUserAsync(request.Auth0Id, request.Email, request.DisplayName);

        // Mark invite as used
        await _signUpInvitesService.MarkInviteAsUsedAsync(invite.Id);

        return Ok(new { user, isNew = true });
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] UpdateUserRequest request)
    {
        var user = await _usersService.GetByIdAsync(id);
        if (user == null)
            return NotFound(new { error = "User not found" });

        user.DisplayName = request.DisplayName ?? user.DisplayName;
        user.Email = request.Email ?? user.Email;

        var updatedUser = await _usersService.UpdateAsync(user);
        return Ok(updatedUser);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var deleted = await _usersService.DeleteAsync(id);
        if (!deleted)
            return NotFound(new { error = "User not found" });

        return NoContent();
    }
}

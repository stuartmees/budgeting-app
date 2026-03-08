using BudgetingApp.Models.DTOs.Requests;
using BudgetingApp.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace BudgetingApp.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly IUserInvitesService _userInvitesService;
    private readonly IUsersService _usersService;

    public AuthController(IUserInvitesService userInvitesService, IUsersService usersService)
    {
        _userInvitesService = userInvitesService;
        _usersService = usersService;
    }

    [HttpPost("user-invites/validation")]
    public async Task<IActionResult> ValidateInvite([FromBody] UserRegistrationRequest request)
    {
        var invite = await _userInvitesService.ValidateInviteAsync(request.Email, request.InviteCode);
        if (invite == null)
            return NotFound(new { error = "Invalid or expired invite" });

        // Mark the invite as validated so Auth0 Action can verify
        await _userInvitesService.MarkCodeValidatedAsync(invite.Id);

        return Ok(new { id = invite.Id, email = invite.Email });
    }

    [HttpGet("user-invites/{id}/is-pending")]
    public async Task<IActionResult> GetInviteIsPending(int id)
    {
        var isPending = await _userInvitesService.GetIsPendingAsync(id);
        return Ok(new { isPending });
    }

    [HttpPost("users/lookup")]
    public async Task<IActionResult> LookupUser([FromBody] LookupUserRequest request)
    {
        var existingUser = await _usersService.GetByAuth0IdAsync(request.Auth0Id);
        if (existingUser != null) return Ok(new { user = existingUser });

        return NotFound(new { error = "User not found. Please register with an invite code." });
    }
}
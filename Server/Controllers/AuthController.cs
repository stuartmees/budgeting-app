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
    public async Task<IActionResult> ValidateInvite([FromBody] ValidateInviteRequest request)
    {
        var invite = await _userInvitesService.ValidateInviteAsync(request.Email, request.InviteCode);
        if (invite == null)
            return NotFound(new { error = "Invalid or expired invite" });

        // Mark the invite as validated so Auth0 Action can verify
        await _userInvitesService.MarkCodeValidatedAsync(invite.Id);

        return Ok(new { email = invite.Email });
    }

    [HttpPost("user-invites/check-pending")]
    public async Task<IActionResult> CheckPendingInvite([FromBody] CheckPendingInviteRequest request)
    {
        var hasPending = await _userInvitesService.HasPendingValidationAsync(request.Email);
        if (!hasPending)
            return NotFound(new { error = "No pending invite validation found" });

        return Ok(new { valid = true });
    }

    [HttpPost("users/lookup")]
    public async Task<IActionResult> LookupUser([FromBody] LookupUserRequest request)
    {
        var existingUser = await _usersService.GetByAuth0IdAsync(request.Auth0Id);
        if (existingUser != null)
        {
            return Ok(new { user = existingUser });
        }

        return NotFound(new { error = "User not found. Please register with an invite code." });
    }
}

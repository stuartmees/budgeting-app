using BudgetingApp.Services;
using Microsoft.AspNetCore.Mvc;

namespace BudgetingApp.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly ISignUpInvitesService _signUpInvitesService;
    private readonly IUsersService _usersService;

    public AuthController(ISignUpInvitesService signUpInvitesService, IUsersService usersService)
    {
        _signUpInvitesService = signUpInvitesService;
        _usersService = usersService;
    }

    [HttpPost("sign-up-invites/validation")]
    public async Task<IActionResult> ValidateInvite([FromBody] ValidateInviteRequest request)
    {
        var invite = await _signUpInvitesService.ValidateInviteAsync(request.Email, request.Code);
        if (invite == null)
            return NotFound(new { error = "Invalid or expired invite" });

        return Ok(new { email = invite.Email });
    }

    [HttpPost("users")]
    public async Task<IActionResult> CreateUser([FromBody] CreateUserRequest request)
    {
        // Check if user already exists
        var existingUser = await _usersService.GetByAuth0IdAsync(request.Auth0Id);
        if (existingUser != null)
        {
            return Ok(new { user = existingUser, isNew = false });
        }

        // Validate invite again
        var invite = await _signUpInvitesService.ValidateInviteAsync(request.Email, request.InviteCode);
        if (invite == null)
            return BadRequest(new { error = "Invalid or expired invite" });

        // Create user
        var user = await _usersService.CreateUserAsync(request.Auth0Id, request.Email, request.DisplayName);

        // Mark invite as used
        await _signUpInvitesService.MarkInviteAsUsedAsync(invite.Id);

        return Ok(new { user, isNew = true });
    }

    [HttpPost("users/lookup")]
    public async Task<IActionResult> LookupUser([FromBody] LookupUserRequest request)
    {
        // Check if user already exists
        var existingUser = await _usersService.GetByAuth0IdAsync(request.Auth0Id);
        if (existingUser != null)
        {
            return Ok(new { user = existingUser, isNew = false });
        }

        // User doesn't exist - they need to register with an invite
        return NotFound(new { error = "User not found. Please register with an invite code." });
    }
}

public class ValidateInviteRequest
{
    public required string Email { get; set; }
    public required string Code { get; set; }
}

public class CreateUserRequest
{
    public required string Auth0Id { get; set; }
    public required string Email { get; set; }
    public required string DisplayName { get; set; }
    public required string InviteCode { get; set; }
}

public class LookupUserRequest
{
    public required string Auth0Id { get; set; }
    public required string Email { get; set; }
}

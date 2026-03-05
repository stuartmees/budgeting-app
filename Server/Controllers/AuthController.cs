using BudgetingApp.Models.DTOs.Requests;
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

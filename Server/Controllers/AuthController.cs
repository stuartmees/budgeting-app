using BudgetingApp.Services;
using Microsoft.AspNetCore.Mvc;

namespace BudgetingApp.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly ISignUpInvitesService _signUpInvitesService;

    public AuthController(ISignUpInvitesService signUpInvitesService)
    {
        _signUpInvitesService = signUpInvitesService;
    }

    [HttpPost("validate-invite")]
    public async Task<IActionResult> ValidateInvite([FromBody] ValidateInviteRequest request)
    {
        var invite = await _signUpInvitesService.ValidateInviteAsync(request.Email, request.Code);
        if (invite == null)
            return NotFound(new { error = "Invalid or expired invite" });

        return Ok(new { email = invite.Email });
    }
}

public class ValidateInviteRequest
{
    public required string Email { get; set; }
    public required string Code { get; set; }
}

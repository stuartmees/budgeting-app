namespace BudgetingApp.Models.DTOs.Requests;

public class ValidateInviteRequest
{
    public required string Email { get; set; }
    public required string Code { get; set; }
}

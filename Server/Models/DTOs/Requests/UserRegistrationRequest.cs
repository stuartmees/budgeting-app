namespace BudgetingApp.Models.DTOs.Requests;

public class UserRegistrationRequest
{
    public required string Email { get; set; }
    public required string InviteCode { get; set; }
}

namespace BudgetingApp.Models.DTOs.Requests;

public class CreateUserRequest
{
    public required string Auth0Id { get; set; }
    public required string Email { get; set; }
    public required string DisplayName { get; set; }
    public required string InviteCode { get; set; }
}

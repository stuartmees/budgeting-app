namespace BudgetingApp.Models.DTOs.Requests;

public class LookupUserRequest
{
    public required string Auth0Id { get; set; }
    public required string Email { get; set; }
}

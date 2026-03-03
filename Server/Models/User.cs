namespace BudgetingApp.Models;

public class User
{
    public int Id { get; set; }
    public required string OktaId { get; set; }
    public required string Email { get; set; }
    public string? DisplayName { get; set; }
    public DateTime CreatedAt { get; set; }
}

namespace BudgetingApp.Models.Entities;

public class UserInvite
{
    public int Id { get; set; }
    public required string Email { get; set; }
    public required string InviteCode { get; set; }
    public DateTime Created { get; set; }
    public bool Used { get; set; }
    public DateTime? CodeValidated { get; set; }
}

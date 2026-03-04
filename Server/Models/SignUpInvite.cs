namespace BudgetingApp.Models;

public class SignUpInvite
{
    public int Id { get; set; }
    public required string Email { get; set; }
    public required string Code { get; set; }
    public DateTime Created { get; set; }
    public bool Used { get; set; }
}

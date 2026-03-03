namespace BudgetingApp.Models;

public class Month
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public required string Name { get; set; }
    public string Status { get; set; } = "future";
    public DateTime CreatedAt { get; set; }
}

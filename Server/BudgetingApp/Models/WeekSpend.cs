namespace BudgetingApp.Models;

public class WeekSpend
{
    public int Id { get; set; }
    public required string Description { get; set; }
    public decimal Amount { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public int WeekId { get; set; }
    public Week Week { get; set; } = null!;
}

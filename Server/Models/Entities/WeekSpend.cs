namespace BudgetingApp.Models.Entities;

public class WeekSpend
{
    public int Id { get; set; }
    public int WeekId { get; set; }
    public required string Description { get; set; }
    public decimal Amount { get; set; }
    public DateTime CreatedAt { get; set; }
}

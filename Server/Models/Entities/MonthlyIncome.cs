namespace BudgetingApp.Models.Entities;

public class MonthlyIncome
{
    public int Id { get; set; }
    public int MonthId { get; set; }
    public required string Name { get; set; }
    public decimal Amount { get; set; }
    public bool IsRecurring { get; set; }
}

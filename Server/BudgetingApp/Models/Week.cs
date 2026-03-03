namespace BudgetingApp.Models;

public class Week
{
    public int Id { get; set; }
    public int WeekNumber { get; set; }
    public DateOnly StartDate { get; set; }
    public decimal Budget { get; set; }
    public string? Notes { get; set; }

    public int MonthId { get; set; }
    public Month Month { get; set; } = null!;

    public ICollection<WeekSpend> Spends { get; set; } = new List<WeekSpend>();

    public decimal TotalSpent => Spends.Sum(s => s.Amount);
    public decimal RemainingBalance => Budget - TotalSpent;
}

namespace BudgetingApp.Models;

public enum MonthStatus
{
    Future,
    Current,
    Past
}

public class Month
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public MonthStatus Status { get; set; } = MonthStatus.Future;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public int UserId { get; set; }
    public User User { get; set; } = null!;

    public ICollection<MonthlyIncome> Incomes { get; set; } = new List<MonthlyIncome>();
    public ICollection<MonthlyOutgoing> Outgoings { get; set; } = new List<MonthlyOutgoing>();
    public ICollection<Week> Weeks { get; set; } = new List<Week>();

    public decimal TotalIncome => Incomes.Sum(i => i.Amount);
    public decimal TotalOutgoings => Outgoings.Sum(o => o.Amount);
    public decimal DisposableIncome => TotalIncome - TotalOutgoings;
}

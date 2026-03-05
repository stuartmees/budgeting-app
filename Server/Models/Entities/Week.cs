namespace BudgetingApp.Models.Entities;

public class Week
{
    public int Id { get; set; }
    public int MonthId { get; set; }
    public int WeekNumber { get; set; }
    public DateOnly StartDate { get; set; }
    public decimal Budget { get; set; }
    public string? Notes { get; set; }
}

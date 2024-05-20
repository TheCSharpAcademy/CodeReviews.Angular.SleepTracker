using System;

namespace SleepTracker.Models;

public class SleepLogDto (SleepLog log)
{
    public int? Id { get; set; } = log.Id;
    public DateTime? StartDate { get; set; } = log.StartDate;
    public DateTime? EndDate { get; set; } = log.EndDate;
    public string? Comments { get; set; } = log.Comments;
}
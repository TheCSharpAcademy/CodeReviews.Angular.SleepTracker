namespace SleepTrackerAPI.Models;

public class SleepRecord
{
    public int Id { get; set; }
    public DateTimeOffset StartTime { get; set; }
    public DateTimeOffset EndTime { get; set; }
}
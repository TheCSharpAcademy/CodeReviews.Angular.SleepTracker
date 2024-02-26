namespace SleepTrackerAPI.Models;

public class SleepRecord
{
    public int Id { get; set; }
    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }
}
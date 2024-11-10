namespace SleepTrackerAPI.Models
{
    public record LogsDTO
    {
        public IEnumerable<SleepData> logs { get; set; }
        public int logsCount { get; set; }
    }
}

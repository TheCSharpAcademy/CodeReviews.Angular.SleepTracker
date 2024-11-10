using System.ComponentModel.DataAnnotations;

namespace SleepTrackerAPI.Models
{
    public class Sleep
    {
        [Key]
        public int Id { get; set; }
        public DateTime StartOfSleep { get; set; }
        public DateTime EndOfSleep { get; set; }
        public int TypeOfSleep { get; set; } = 1;
        public TimeSpan LengthOfSleep => EndOfSleep - StartOfSleep;
    }
}
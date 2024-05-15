using System.ComponentModel.DataAnnotations;

namespace SleepTracker.API.Models;

public class SleepSession
{
  [Key]
  public int Id { get; set; }

  [Required]
  public DateTime StartTime { get; set; }

  [Required]
  public DateTime EndTime { get; set; }

  public double DurationInMinutes => (EndTime - StartTime).TotalMinutes;
}

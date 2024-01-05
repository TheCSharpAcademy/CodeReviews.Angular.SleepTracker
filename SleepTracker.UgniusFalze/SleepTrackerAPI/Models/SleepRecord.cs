using System.ComponentModel.DataAnnotations;

namespace SleepTracker.UgniusFalze.Models;

public class SleepRecord
{
    public int SleepRecordId { get; set; }

    public int RecordStart { get; set; }
    public int RecordEnd { get; set; }
}
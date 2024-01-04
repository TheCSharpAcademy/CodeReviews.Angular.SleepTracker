using System.ComponentModel.DataAnnotations;

namespace SleepTracker.UgniusFalze.Models;

public class SleepRecord
{
    public int SleepRecordId { get; set; }

    [Timestamp] public int RecordStart { get; set; }
    [Timestamp] public int RecordEnd { get; set; }
}
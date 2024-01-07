using System.ComponentModel.DataAnnotations;

namespace SleepTracker.UgniusFalze.Models;

public class SleepRecord
{
    public int SleepRecordId { get; set; }

    public long RecordStart { get; set; }
    public long RecordEnd { get; set; }

    public SleepRecordDTO ToDto()
    {
        return new SleepRecordDTO(this);
    }
}
using System.ComponentModel.DataAnnotations;

namespace SleepTracker.UgniusFalze.Models;

public class SleepRecord
{
    public int SleepRecordId { get; set; }
    
    public DateTime RecordStart { get; set; }
    public DateTime RecordEnd { get; set; }

    public SleepRecordDTO ToDto()
    {
        return new SleepRecordDTO(this);
    }
}
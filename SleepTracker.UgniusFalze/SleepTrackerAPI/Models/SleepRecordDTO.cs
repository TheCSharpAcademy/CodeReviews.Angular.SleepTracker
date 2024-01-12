namespace SleepTracker.UgniusFalze.Models;

public class SleepRecordDTO
{
    public int SleepRecordId { get; set; }
    public DateTime SleepRecordStart { get; set; }
    public string HoursSlept { get; set; }

    public SleepRecordDTO(SleepRecord sleepRecord)
    {
        SleepRecordId = sleepRecord.SleepRecordId;
        SleepRecordStart = sleepRecord.RecordStart;

        var timeDIff = (sleepRecord.RecordEnd - SleepRecordStart).TotalSeconds;

        var hours = (int)timeDIff / 3600;
        var minutes = (int)(timeDIff % 3600) / 60;
        var seconds = (int)(timeDIff % 3600) % 60;
        
        HoursSlept = $"{hours}:{minutes}:{seconds}";
    }
}
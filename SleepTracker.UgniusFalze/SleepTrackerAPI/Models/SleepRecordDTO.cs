namespace SleepTracker.UgniusFalze.Models;

public class SleepRecordDTO
{
    public int SleepRecordId { get; set; }
    public DateTime SleepRecordStart { get; set; }
    public int HoursSlept { get; set; }

    public SleepRecordDTO(SleepRecord sleepRecord)
    {
        SleepRecordId = sleepRecord.SleepRecordId;
        SleepRecordStart = sleepRecord.RecordStart;
        HoursSlept = (sleepRecord.RecordEnd - SleepRecordStart).Hours;
    }
}
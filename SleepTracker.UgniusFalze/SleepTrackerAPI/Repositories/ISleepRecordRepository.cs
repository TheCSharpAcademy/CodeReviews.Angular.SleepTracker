using Microsoft.AspNetCore.Mvc;
using SleepTracker.UgniusFalze.Models;

namespace SleepTracker.UgniusFalze.Repositories;

public interface ISleepRecordRepository
{
    public Task AddSleepRecord(SleepRecord record);
    public Task UpdateSleepRecord(SleepRecord record);
    public Task<ActionResult<IEnumerable<SleepRecordDTO>>> GetRecords(int limit, int page);
    public Task DeleteSleepRecord(SleepRecord record);
    public bool SleepRecordExists(int id);
    public Task<SleepRecord?> GetSleepRecord(int id);
    public Task<long> GetSleepRecordCount();
}
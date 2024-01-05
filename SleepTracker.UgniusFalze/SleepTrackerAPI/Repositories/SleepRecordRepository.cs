using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SleepTracker.UgniusFalze.Models;

namespace SleepTracker.UgniusFalze.Repositories;

public class SleepRecordRepository(SleepRecordContext context) : ISleepRecordRepository
{
    public async Task<ActionResult<IEnumerable<SleepRecord>>> GetRecords(int limit = 10, int page = 0)
    {
        return await context.SleepRecords.Skip(limit * page).Take(limit).ToListAsync();
    }

    public async Task AddSleepRecord(SleepRecord record)
    {
        context.SleepRecords.Add(record);
        await SaveChanges();
    }

    public async Task DeleteSleepRecord(SleepRecord record)
    {
        context.SleepRecords.Remove(record);
        await SaveChanges();    }

    public async Task<SleepRecord?> GetSleepRecord(int id)
    {
        return await context.SleepRecords.FindAsync(id);
    }

    public bool SleepRecordExists(int id)
    {
        return context.SleepRecords.Any(records => records.SleepRecordId == id);
    }

    public async Task UpdateSleepRecord(SleepRecord record)
    {
        context.Entry(record).State = EntityState.Modified;
        await SaveChanges();
    }
    
    private async Task SaveChanges()
    {
        await context.SaveChangesAsync();
    }
}
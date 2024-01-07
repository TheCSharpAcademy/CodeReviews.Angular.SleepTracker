using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SleepTracker.UgniusFalze.Models;

namespace SleepTracker.UgniusFalze.Repositories;

public class SleepRecordRepository(SleepRecordContext context) : ISleepRecordRepository
{
    public async Task<ActionResult<IEnumerable<SleepRecordDTO>>> GetRecords(string? date, int limit = 10, int page = 0)
    {

        var sleepRecordQuery = (IQueryable<SleepRecord>)context.SleepRecords;
        if (date != null)
        {
            var convertedDate = DateTime.Parse(date).Date;
            sleepRecordQuery = sleepRecordQuery.Where(record => record.RecordStart.Date == convertedDate);
        }

        var sleepRecords = await sleepRecordQuery
            .Skip(limit * page)
            .Take(limit)
            .OrderBy(record => record.SleepRecordId)
            .ToListAsync();
        return sleepRecords.ConvertAll<SleepRecordDTO>(sleepRecord => sleepRecord.ToDto());
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

    public async Task<long> GetSleepRecordCount(string? date)
    {
        IQueryable<SleepRecord> query = context.SleepRecords;
        if (date != null)
        {
            var convertedDate = DateTime.Parse(date).Date;
            query = query.Where(record => record.RecordStart.Date == convertedDate);
        }
        return await query.CountAsync();
    }

    public async Task<ActionResult<IEnumerable<DateTime>>> GetDates()
    {
        return await context.SleepRecords
            .Select(record => record.RecordStart.Date)
            .Distinct()
            .ToListAsync();
    }

    private async Task SaveChanges()
    {
        await context.SaveChangesAsync();
    }
}
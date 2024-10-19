using Microsoft.EntityFrameworkCore;
using SleepTracker.Api.Models;

namespace SleepTracker.Api.Data;

/// <summary>
/// Provides repository operations for managing the <see cref="SleepRecord"/> entity.
/// This class implements the <see cref="ISleepTrackerRepository"/> interface, offering 
/// methods to perform CRUD operations against the database using Entity Framework Core.
/// </summary>
public class SleepTrackerRepository : ISleepTrackerRepository
{
    #region Fields

    private readonly SleepTrackerDataContext _dataContext;

    #endregion
    #region Constructors

    public SleepTrackerRepository(SleepTrackerDataContext dataContext)
    {
        _dataContext = dataContext;
    }

    #endregion
    #region Methods

    public async Task CreateAsync(SleepRecord sleepRecord)
    {
        await _dataContext.SleepRecord.AddAsync(sleepRecord);
    }

    public async Task DeleteAsync(SleepRecord sleepRecord)
    {
        var entity = await _dataContext.SleepRecord.FindAsync(sleepRecord.Id);
        if (entity is not null)
        {
            _dataContext.SleepRecord.Remove(entity);
        }
    }

    public async Task<IEnumerable<SleepRecord>> ReturnAsync()
    {
        return await _dataContext.SleepRecord.OrderByDescending(o => o.Started).ToListAsync();
    }

    public async Task<SleepRecord?> ReturnAsync(Guid id)
    {
        return await _dataContext.SleepRecord.FindAsync(id);
    }

    public async Task UpdateAsync(SleepRecord sleepRecord)
    {
        var entity = await _dataContext.SleepRecord.FindAsync(sleepRecord.Id);
        if (entity is not null)
        {
            entity.Started = sleepRecord.Started;
            entity.Finished = sleepRecord.Finished;
            _dataContext.SleepRecord.Update(entity);
        }
    }

    #endregion
}

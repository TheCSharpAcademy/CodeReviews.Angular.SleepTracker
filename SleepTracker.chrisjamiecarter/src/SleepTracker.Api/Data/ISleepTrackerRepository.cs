using SleepTracker.Api.Models;

namespace SleepTracker.Api.Data;

/// <summary>
/// Defines the contract for performing CRUD operations on <see cref="SleepRecord"/> entities in the
/// data store.
/// </summary>
public interface ISleepTrackerRepository
{
    Task CreateAsync(SleepRecord sleepRecord);
    Task DeleteAsync(SleepRecord sleepRecord);
    Task<IEnumerable<SleepRecord>> ReturnAsync();
    Task<SleepRecord?> ReturnAsync(Guid id);
    Task UpdateAsync(SleepRecord sleepRecord);
}
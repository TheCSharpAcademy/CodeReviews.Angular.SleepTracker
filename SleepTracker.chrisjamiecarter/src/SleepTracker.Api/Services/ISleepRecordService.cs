using SleepTracker.Api.Models;

namespace SleepTracker.Api.Services;

/// <summary>
/// Defines the contract for a service that manages <see cref="SleepRecord"/> entities.
/// </summary>
public interface ISleepRecordService
{
    Task<bool> CreateAsync(SleepRecord sleepRecord);
    Task<bool> DeleteAsync(SleepRecord sleepRecord);
    Task<IEnumerable<SleepRecord>> ReturnAsync();
    Task<SleepRecord?> ReturnAsync(Guid id);
    Task<bool> UpdateAsync(SleepRecord sleepRecord);
}
namespace SleepTracker.Api.Data;

/// <summary>
/// Represents a unit of work pattern interface for coordinating changes across multiple repositories in the Application.
/// </summary>
public interface IUnitOfWork
{
    ISleepTrackerRepository SleepRecord { get; set; }
    Task<int> SaveAsync();
}
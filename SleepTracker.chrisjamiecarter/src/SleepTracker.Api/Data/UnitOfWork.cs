using Microsoft.EntityFrameworkCore;

namespace SleepTracker.Api.Data;

/// <summary>
/// Provides a central point for managing database transactions and saving changes across repositories.
/// </summary>
/// <remarks>
/// This class follows the Unit of Work design pattern, ensuring that all repository operations 
/// are treated as a single transaction, maintaining data consistency.
/// </remarks>
public class UnitOfWork : IUnitOfWork
{
    #region Fields

    private readonly SleepTrackerDataContext _dataContext;

    #endregion
    #region Constructors

    public UnitOfWork(SleepTrackerDataContext dataContext, ISleepTrackerRepository repository)
    {
        _dataContext = dataContext;
        SleepRecord = repository;
    }

    #endregion
    #region Properties

    public ISleepTrackerRepository SleepRecord { get; set; }

    #endregion
    #region Methods

    public async Task<int> SaveAsync()
    {
        try
        {
            return await _dataContext.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            throw;
        }
    }

    #endregion
}

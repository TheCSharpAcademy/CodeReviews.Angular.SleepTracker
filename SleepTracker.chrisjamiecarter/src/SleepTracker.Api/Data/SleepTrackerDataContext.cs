using Microsoft.EntityFrameworkCore;
using SleepTracker.Api.Models;

namespace SleepTracker.Api.Data;

/// <summary>
/// Represents the Entity Framework Core database context for the SleepTracker data store.
/// </summary>
public class SleepTrackerDataContext : DbContext
{
    #region Constructors

    public SleepTrackerDataContext(DbContextOptions<SleepTrackerDataContext> options) : base(options) { }

    #endregion
    #region Properties

    public DbSet<SleepRecord> SleepRecord { get; set; } = default!;

    #endregion
}

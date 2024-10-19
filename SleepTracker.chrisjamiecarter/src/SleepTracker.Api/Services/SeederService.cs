using SleepTracker.Api.Data;
using SleepTracker.Api.Models;

namespace SleepTracker.Api.Services;

/// <summary>
/// Provides methods to seed the database with initial data using Bogus.
/// </summary>
public class SeederService : ISeederService
{
    #region Fields

    private readonly SleepTrackerDataContext _dataContext;

    #endregion
    #region Constructors

    public SeederService(SleepTrackerDataContext dataContext)
    {
        _dataContext = dataContext;
    }

    #endregion
    #region Methods

    public void SeedDatabase()
    {
        SeedSleepRecords();
    }

    /// <summary>
    /// Seeds the database with four weeks worth of sleep records.
    /// It calculates a random time +/- 2 hours from 10pm and +/- 2 hours from 8am.
    /// </summary>
    private void SeedSleepRecords()
    {
        if (_dataContext.SleepRecord.Any())
        {
            return;
        }

        var seedDate = DateTime.Now.AddDays(-28);

        while (seedDate < DateTime.Now.Date)
        {
            var sleepDate = DateOnly.FromDateTime(seedDate);
            var sleepTime = new TimeOnly(22, 00, 00).AddMinutes(Random.Shared.Next(-120, 120));
            var wakeDate = sleepDate.AddDays(1);
            var wakeTime = new TimeOnly(08, 00, 00).AddMinutes(Random.Shared.Next(-120, 120));

            var sleepRecord = new SleepRecord
            {
                Id = Guid.NewGuid(),
                Started = new DateTime(sleepDate, sleepTime),
                Finished = new DateTime(wakeDate, wakeTime),
            };

            _dataContext.SleepRecord.Add(sleepRecord);

            seedDate = seedDate.AddDays(1);
        }

        _dataContext.SaveChanges();
    }

    #endregion
}

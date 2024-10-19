namespace SleepTracker.Api.Contracts.V1;

/// <summary>
/// Represents only the necessary information required from API requests to create or update a sleep record.
/// </summary>
public class SleepRecordRequest
{
    #region Properties

    public required DateTime Started { get; set; }

    public required DateTime Finished { get; set; }

    #endregion
}

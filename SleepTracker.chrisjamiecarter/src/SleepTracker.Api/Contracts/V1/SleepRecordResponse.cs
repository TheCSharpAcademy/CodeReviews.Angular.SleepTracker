namespace SleepTracker.Api.Contracts.V1;

/// <summary>
/// Represents only the necessary information for returning a sleep record as API response back to 
/// the client.
/// </summary>
public class SleepRecordResponse
{
    #region Properties

    public required Guid Id { get; set; }

    public required DateTime Started { get; set; }

    public required DateTime Finished { get; set; }

    public string Duration
    { 
        get
        {
            var duration = Finished - Started;

            var hours = Convert.ToInt32(duration.TotalHours);
            var minutes = duration.Minutes;

            return $"{hours:D2}:{minutes:D2}";
        }
    }

    #endregion
}

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SleepTracker.Api.Models;

/// <summary>
/// Represents a sleep record model. This acts as both the domain and infrastructure version.
/// </summary>
[Table("SleepRecord")]
public class SleepRecord
{
    #region Properties

    [Key]
    public required Guid Id { get; set; }

    [DataType(DataType.DateTime), Required]
    public required DateTime Started { get; set; }

    [DataType(DataType.DateTime), Required]
    public required DateTime Finished { get; set; }

    #endregion
}

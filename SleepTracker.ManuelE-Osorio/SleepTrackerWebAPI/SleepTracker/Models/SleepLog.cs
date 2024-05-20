using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace SleepTracker.Models;

public class SleepLog : IValidatableObject
{
    public int? Id { get; set; }

    [Required]
    public DateTime? StartDate { get; set; }

    [Required]
    public DateTime? EndDate { get; set; }
    public string? Comments { get; set; }
    public IdentityUser? User {get; set;}

    public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
    {
        if (EndDate < StartDate)
        {
            yield return new ValidationResult("EndDate must be greater than StartDate");
        }
    }
}
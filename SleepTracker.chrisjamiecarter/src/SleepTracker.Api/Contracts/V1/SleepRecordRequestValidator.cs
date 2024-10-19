using FluentValidation;

namespace SleepTracker.Api.Contracts.V1;

/// <summary>
/// The validation rules for the <see cref="SleepRecordRequest"/> model using FluentValidation. 
/// It ensures that the request data conforms to the expected format before processing.
/// </summary>
public class SleepRecordRequestValidator : AbstractValidator<SleepRecordRequest>
{
    #region Constructors

    public SleepRecordRequestValidator()
    {
        RuleFor(x => x.Started).NotEmpty();
        RuleFor(x => x.Finished).NotEmpty().GreaterThan(x => x.Started);
    }

    #endregion
}

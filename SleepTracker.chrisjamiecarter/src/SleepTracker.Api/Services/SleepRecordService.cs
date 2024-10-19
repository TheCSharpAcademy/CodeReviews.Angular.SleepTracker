using SleepTracker.Api.Data;
using SleepTracker.Api.Models;

namespace SleepTracker.Api.Services;

/// <summary>
/// Service class responsible for managing operations related to the <see cref="SleepRecord"/> entity.
/// Provides methods for creating, updating, deleting, and retrieving data by interacting with the
/// underlying data repositories through the Unit of Work pattern.
/// </summary>
public class SleepRecordService : ISleepRecordService
{
    #region Fields

    private readonly IUnitOfWork _unitOfWork;

    #endregion
    #region Constructors

    public SleepRecordService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    #endregion
    #region Methods

    public async Task<bool> CreateAsync(SleepRecord sleepRecord)
    {
        await _unitOfWork.SleepRecord.CreateAsync(sleepRecord);
        var created = await _unitOfWork.SaveAsync();
        return created > 0;
    }

    public async Task<bool> DeleteAsync(SleepRecord sleepRecord)
    {
        await _unitOfWork.SleepRecord.DeleteAsync(sleepRecord);
        var deleted = await _unitOfWork.SaveAsync();
        return deleted > 0;
    }

    public async Task<IEnumerable<SleepRecord>> ReturnAsync()
    {
        return await _unitOfWork.SleepRecord.ReturnAsync();
    }

    public async Task<SleepRecord?> ReturnAsync(Guid id)
    {
        return await _unitOfWork.SleepRecord.ReturnAsync(id);
    }

    public async Task<bool> UpdateAsync(SleepRecord sleepRecord)
    {
        await _unitOfWork.SleepRecord.UpdateAsync(sleepRecord);
        var updated = await _unitOfWork.SaveAsync();
        return updated > 0;
    }

    #endregion
}

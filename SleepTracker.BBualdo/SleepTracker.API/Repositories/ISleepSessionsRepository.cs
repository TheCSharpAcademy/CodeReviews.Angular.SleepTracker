using SleepTracker.API.Models;

namespace SleepTracker.API.Repositories;

public interface ISleepSessionsRepository
{
  Task<IEnumerable<SleepSession>> GetAllSessions();
  Task<SleepSession?> GetSessionById(int id);
  Task AddSession(SleepSession session);
  Task UpdateSession(SleepSession session);
  Task DeleteSession(int id);
}

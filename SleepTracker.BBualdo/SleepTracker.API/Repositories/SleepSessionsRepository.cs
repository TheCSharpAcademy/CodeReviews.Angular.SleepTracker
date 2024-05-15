using Microsoft.EntityFrameworkCore;
using SleepTracker.API.Data;
using SleepTracker.API.Models;

namespace SleepTracker.API.Repositories;

public class SleepSessionsRepository(SleepSessionsContext context) : ISleepSessionsRepository
{
  private readonly SleepSessionsContext _context = context;

  public async Task AddSession(SleepSession session)
  {
    await _context.Sessions.AddAsync(session);
    await _context.SaveChangesAsync();
  }

  public async Task DeleteSession(int id)
  {
    SleepSession session = await _context.Sessions.SingleAsync(session => session.Id == id);
    _context.Sessions.Remove(session);
    await _context.SaveChangesAsync();
  }

  public async Task<IEnumerable<SleepSession>> GetAllSessions()
  {
    return await _context.Sessions.ToListAsync();
  }

  public async Task<SleepSession?> GetSessionById(int id)
  {
    return await _context.Sessions.FindAsync(id);
  }

  public async Task UpdateSession(SleepSession session)
  {
    _context.Entry(session).State = EntityState.Modified;
    await _context.SaveChangesAsync();
  }
}

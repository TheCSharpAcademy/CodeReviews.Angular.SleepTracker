using Microsoft.EntityFrameworkCore;
using SleepTracker.API.Models;

namespace SleepTracker.API.Data;

public class SleepSessionsContext(DbContextOptions options) : DbContext(options)
{
  public DbSet<SleepSession> Sessions { get; set; }
}

using Microsoft.EntityFrameworkCore;
using SleepTracker.Models;

namespace SleepTracker;

public class SleepTrackerContext : DbContext
{
    public SleepTrackerContext(DbContextOptions<SleepTrackerContext> options) : base(options)
    {
    }
    public DbSet<Sleep> Sleeps { get; set; }
}

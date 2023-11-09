using Microsoft.EntityFrameworkCore;
using kmakai.sleeptracker.angular.Models;

namespace kmakai.sleeptracker.angular.Data;

public class SleepTrackerContext: DbContext
{
    public SleepTrackerContext(DbContextOptions<SleepTrackerContext> options) : base(options)
    {
    }

    public DbSet<Record> Records { get; set; }
}

using Microsoft.EntityFrameworkCore;
using SleepTrackerAPI.Models;

namespace SleepTrackerAPI.Database;

public class SleepContext(DbContextOptions<SleepContext> options) : DbContext(options)
{
    public DbSet<SleepRecord> SleepRecords { get; set; } = null!;

}
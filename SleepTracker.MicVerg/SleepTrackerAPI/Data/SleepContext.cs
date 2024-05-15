using Microsoft.EntityFrameworkCore;
using SleepTrackerAPI.Models;

namespace SleepTrackerAPI.Data
{
    public class SleepContext : DbContext
    {
        public SleepContext(DbContextOptions<SleepContext> options)
             : base(options) { }

        public DbSet<Sleep> SleepRecords { get; set; }
    }
}

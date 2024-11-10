namespace SleepTrackerAPI.DataLayer
{
    public class SleepDbContext : DbContext
    {
        public DbSet<Sleep> Sleeps { get; set; }

        public SleepDbContext(DbContextOptions<SleepDbContext> options) : base(options) { }
    }
}
using Microsoft.EntityFrameworkCore;
using SleepTrackerAPI.Models;
namespace SleepTrackerAPI.Data
{
    public class SleepContext : DbContext
    {
        public SleepContext(DbContextOptions<SleepContext> options) : base(options) { }

        public DbSet<SleepData> SleepLogs { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            var logs = new List<SleepData>();
            for (int i = 0; i < 20; i++) {
                logs.Add(
                        new SleepData()
                        {
                            Id = Guid.NewGuid().ToString(),
                            Date = (DateTime.Now - TimeSpan.FromDays(i)).ToString("yyyy-MM-dd"),
                            SleepTime = new Random().Next(6000, 19200)
                        });

            }
            modelBuilder.Entity<SleepData>().HasData(logs);
        }
    }
}
  


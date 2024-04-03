using Microsoft.EntityFrameworkCore;
using SleepTracker.Model;

namespace SleepTracker.Context
{
    public class SleepContext : DbContext
    {
        public SleepContext( DbContextOptions<SleepContext> options ) : base(options) { }


        protected override void OnModelCreating( ModelBuilder modelBuilder )
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<SleepRecordModel>().HasData(
                new SleepRecordModel { Id = 1, Time = "8:00:00", TimeStart = new DateTimeOffset(DateTime.Now).ToUnixTimeMilliseconds(), TimeEnd = new DateTimeOffset(DateTime.Now).ToUnixTimeMilliseconds() },
                new SleepRecordModel { Id = 2, Time = "8:00:00", TimeStart = new DateTimeOffset(DateTime.Now).ToUnixTimeMilliseconds(), TimeEnd = new DateTimeOffset(DateTime.Now).ToUnixTimeMilliseconds() },
                new SleepRecordModel { Id = 3, Time = "8:00:00", TimeStart = new DateTimeOffset(DateTime.Now).ToUnixTimeMilliseconds(), TimeEnd = new DateTimeOffset(DateTime.Now).ToUnixTimeMilliseconds() },
                new SleepRecordModel { Id = 4, Time = "8:00:00", TimeStart = new DateTimeOffset(DateTime.Now).ToUnixTimeMilliseconds(), TimeEnd = new DateTimeOffset(DateTime.Now).ToUnixTimeMilliseconds() },
                new SleepRecordModel { Id = 5, Time = "8:00:00", TimeStart = new DateTimeOffset(DateTime.Now).ToUnixTimeMilliseconds(), TimeEnd = new DateTimeOffset(DateTime.Now).ToUnixTimeMilliseconds() },
                new SleepRecordModel { Id = 6, Time = "8:00:00", TimeStart = new DateTimeOffset(DateTime.Now).ToUnixTimeMilliseconds(), TimeEnd = new DateTimeOffset(DateTime.Now).ToUnixTimeMilliseconds() },
                new SleepRecordModel { Id = 7, Time = "8:00:00", TimeStart = new DateTimeOffset(DateTime.Now).ToUnixTimeMilliseconds(), TimeEnd = new DateTimeOffset(DateTime.Now).ToUnixTimeMilliseconds() }
            );

        }


        public DbSet<SleepRecordModel> SleepRecords { get; set; }
    }
}

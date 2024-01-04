using Microsoft.EntityFrameworkCore;

namespace SleepTracker.UgniusFalze.Models;

public class SleepRecordContext:DbContext
{
    public SleepRecordContext(DbContextOptions<SleepRecordContext> options) : base(options)
    {
        
    }
    
    public DbSet<SleepRecord> SleepRecords { get; set; }
    
}
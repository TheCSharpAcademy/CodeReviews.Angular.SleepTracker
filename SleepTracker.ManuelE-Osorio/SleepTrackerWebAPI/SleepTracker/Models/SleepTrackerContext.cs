using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace SleepTracker.Models;

public class SleepTrackerContext(DbContextOptions<SleepTrackerContext> options) : IdentityDbContext<IdentityUser, IdentityRole, string>(options)
{
    public DbSet<SleepLog> SleepLogs { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<SleepLog>( p => {
            p.HasOne(p => p.User)
                .WithMany()
                .IsRequired();
        });

        modelBuilder.Entity<SleepLog>( p => {
            p.Property( p => p.StartDate)
                .IsRequired();
            p.Property( p => p.EndDate)
                .IsRequired();
            p.Property( p => p.Comments)
                .HasMaxLength(500);
        });
    }
}
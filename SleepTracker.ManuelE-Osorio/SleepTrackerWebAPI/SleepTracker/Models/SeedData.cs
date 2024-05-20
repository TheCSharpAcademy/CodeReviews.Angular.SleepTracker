using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Identity.Client;
using SleepTracker.Models;

namespace CoffeeTracker.Models;

public class SeedData
{
    public static async Task<bool> SeedUser( IServiceProvider serviceProvider)
    {
        var context = serviceProvider.GetRequiredService<SleepTrackerContext>();
        if(context.Users.Any())
            return false;

        var roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();
        await roleManager.CreateAsync(new IdentityRole("Admin"));
        await roleManager.CreateAsync(new IdentityRole("User"));

        var userManager = serviceProvider.GetRequiredService<UserManager<IdentityUser>>();
        var userStore = serviceProvider.GetRequiredService<IUserStore<IdentityUser>>();
        var emailStore = (IUserEmailStore<IdentityUser>)userStore;
        var email = "admin@thecsharpacademy.com";
        var user = new IdentityUser();
        await userStore.SetUserNameAsync(user, email, CancellationToken.None);
        await emailStore.SetEmailAsync(user, email, CancellationToken.None);
        await userManager.CreateAsync(user, "Admin1234");
        await userManager.AddToRoleAsync(user, "Admin");

        user = new IdentityUser();        
        email = "user@thecsharpacademy.com";
        await userStore.SetUserNameAsync(user, email, CancellationToken.None);
        await emailStore.SetEmailAsync(user, email, CancellationToken.None);
        await userManager.CreateAsync(user, "User1234");
        await userManager.AddToRoleAsync(user, "User");

        context.SaveChanges();
        return true;
    }

    public static async void SeedLogs(IServiceProvider serviceProvider)
    {
        var userManager = serviceProvider.GetRequiredService<UserManager<IdentityUser>>();
        var user = await userManager.FindByEmailAsync("admin@thecsharpacademy.com");
        var context = serviceProvider.GetRequiredService<SleepTrackerContext>();

        context.SleepLogs.AddRange([
            new SleepLog { 
                StartDate = new DateTime(2024, 4, 22, 22, 0, 0),
                EndDate = new DateTime( 2024, 4, 23, 8, 30, 0),
                Comments = "Well rested",
                User = user
            },
            new SleepLog { 
                StartDate = new DateTime(2024, 4, 21, 23, 15, 0),
                EndDate = new DateTime( 2024, 4, 22, 7, 22, 0),
                Comments = "Nightmares",
                User = user
            },
            new SleepLog { 
                StartDate = new DateTime(2024, 4, 20, 23, 30, 0),
                EndDate = new DateTime( 2024, 4, 21, 8, 25, 0),
                Comments = "Bad Sleep",
                User = user
            },
            new SleepLog { 
                StartDate = new DateTime(2024, 4, 19, 20, 40, 0),
                EndDate = new DateTime( 2024, 4, 20, 6, 50, 0),
                Comments = "Well rested",
                User = user
            },
            new SleepLog { 
                StartDate = new DateTime(2024, 4, 18, 23, 40, 0),
                EndDate = new DateTime( 2024, 4, 19, 7, 15, 0),
                Comments = "Well rested",
                User = user
            },
            new SleepLog { 
                StartDate = new DateTime(2024, 4, 17, 22, 35, 0),
                EndDate = new DateTime( 2024, 4, 18, 8, 20, 0),
                Comments = "Waking up in the middle of the night",
                User = user
            },
            new SleepLog { 
                StartDate = new DateTime(2024, 4, 16, 19, 55, 0),
                EndDate = new DateTime( 2024, 4, 17, 6, 0, 0),
                Comments = "Dehydrated",
                User = user
            }
        ]);

        user = await userManager.FindByEmailAsync("user@thecsharpacademy.com");
        context.SleepLogs.AddRange([
            new SleepLog { 
                StartDate = new DateTime(2024, 4, 22, 22, 0, 0),
                EndDate = new DateTime( 2024, 4, 23, 8, 30, 0),
                Comments = "Well rested",
                User = user
            },
            new SleepLog { 
                StartDate = new DateTime(2024, 4, 21, 23, 15, 0),
                EndDate = new DateTime( 2024, 4, 22, 7, 22, 0),
                Comments = "Nightmares",
                User = user
            },
            new SleepLog { 
                StartDate = new DateTime(2024, 4, 20, 23, 30, 0),
                EndDate = new DateTime( 2024, 4, 21, 8, 25, 0),
                Comments = "Bad Sleep",
                User = user
            },
            new SleepLog { 
                StartDate = new DateTime(2024, 4, 19, 20, 40, 0),
                EndDate = new DateTime( 2024, 4, 20, 6, 50, 0),
                Comments = "Well rested",
                User = user
            }
        ]);
        context.SaveChanges();
    }
}
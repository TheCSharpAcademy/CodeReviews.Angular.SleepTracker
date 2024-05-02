using Microsoft.AspNetCore.Identity;

namespace SleepTracker.Models;

public class UserDto( IdentityUser user)
{
    public string? Id {get; set;} = user.Id;
    public string? UserName { get; set; } = user.UserName;
}
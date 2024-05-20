using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SleepTracker.Models;
using System.Threading.Tasks;
using System.Linq;
using System.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;

namespace SleepTracker.Controllers;

[ApiController]
[ApiConventionType(typeof(DefaultApiConventions))]
[Route("api/users")]
[Authorize(Roles = "Admin")]
public class UsersController(SleepTrackerContext context, 
    UserManager<IdentityUser> userManager, RoleManager<IdentityRole> roleManager) : Controller
{
    private readonly SleepTrackerContext _context = context;
    private readonly UserManager<IdentityUser> _userManager = userManager;
    private readonly RoleManager<IdentityRole> _roleManager = roleManager;

    [HttpGet]
    public async Task<IResult> GetAllUsers(int? startIndex, int? pageSize)
    {
        if (_context.Users == null)
            return TypedResults.Problem("Entity set 'Users'  is null.");

        var query = from m in _context.Users select m ;

        query = query.Skip(startIndex ?? 0).Take(pageSize ?? 5);

        return TypedResults.Ok(await query.Select( p => new UserDto(p) )
            .ToListAsync());
    }

    [HttpGet("{id}")]
    public async Task<IResult> GetUser(string id)
    {
        if (_context.Users == null)
            return TypedResults.Problem("Entity set 'Users'  is null.");

        var user = await _userManager.FindByIdAsync(id);

        if( user is null)
            return TypedResults.NotFound();

        return TypedResults.Ok(new UserDto(user));
    }

    [HttpDelete("{id}")]
    [Consumes("application/json")]
    public async Task<IResult> DeleteUser(string id)  // delete session cookies and log out?
    {
        var user = await _userManager.FindByIdAsync(id);
        if( user is null)
            return TypedResults.NotFound();

        var deleteResult = await _userManager.DeleteAsync(user);

        if( !deleteResult.Succeeded)
            return TypedResults.StatusCode(500);
        
        return TypedResults.Ok();
    }
}
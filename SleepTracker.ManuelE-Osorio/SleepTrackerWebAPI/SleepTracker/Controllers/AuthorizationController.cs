using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SleepTracker.Models;
using System.Threading.Tasks;
using System.Linq;
using System.Data;
using System;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;

namespace SleepTracker.Controllers;

[ApiController]
[ApiConventionType(typeof(DefaultApiConventions))]
[Authorize]
public class SleepTrackerController( SignInManager<IdentityUser> signInManager) : Controller
{
    private readonly SignInManager<IdentityUser> _signInManager = signInManager;

    [HttpPost]
    [Route("/logout")]
    public async Task<IResult> LogOut( [FromBody] object empty)
    {
        if (empty is not null)
        {
            await _signInManager.SignOutAsync();
            return TypedResults.Ok();
        }
        return TypedResults.NotFound();
    }

    [HttpGet]
    [Route("/role")]
    public IResult UserIsAdmin ()
    {
        return TypedResults.Ok( User.IsInRole("Admin"));
    }

}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SleepTrackerAPI.Data;
using SleepTrackerAPI.Models;

namespace SleepTrackerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SleepsController : ControllerBase
    {
        private readonly SleepContext _context;

        public SleepsController(SleepContext context)
        {
            _context = context;
        }

        // GET: api/Sleeps
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Sleep>>> GetSleepRecords()
        {
            return await _context.SleepRecords.ToListAsync();
        }

        // GET: api/Sleeps/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Sleep>> GetSleep(int id)
        {
            var sleep = await _context.SleepRecords.FindAsync(id);

            if (sleep == null)
            {
                return NotFound();
            }

            return sleep;
        }

        // PUT: api/Sleeps/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSleep(int id, Sleep sleep)
        {
            if (id != sleep.Id)
            {
                return BadRequest();
            }

            _context.Entry(sleep).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SleepExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Sleeps
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Sleep>> PostSleep(Sleep sleep)
        {
            _context.SleepRecords.Add(sleep);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSleep", new { id = sleep.Id }, sleep);
        }

        // DELETE: api/Sleeps/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSleep(int id)
        {
            var sleep = await _context.SleepRecords.FindAsync(id);
            if (sleep == null)
            {
                return NotFound();
            }

            _context.SleepRecords.Remove(sleep);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SleepExists(int id)
        {
            return _context.SleepRecords.Any(e => e.Id == id);
        }
    }
}

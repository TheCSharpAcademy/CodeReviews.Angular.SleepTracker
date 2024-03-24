using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SleepTracker.Models;

namespace SleepTracker.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SleepController : ControllerBase
    {
        private readonly SleepTrackerContext _context;

        public SleepController(SleepTrackerContext context)
        {
            _context = context;
        }

        // GET: api/Sleep
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Sleep>>> GetSleeps()
        {
            return await _context.Sleeps.ToListAsync();
        }

        // GET: api/Sleep/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Sleep>> GetSleep(int id)
        {
            var sleep = await _context.Sleeps.FindAsync(id);

            if (sleep == null)
            {
                return NotFound();
            }

            return sleep;
        }

        // PUT: api/Sleep/5
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

        // POST: api/Sleep
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Sleep>> PostSleep(Sleep sleep)
        {
            _context.Sleeps.Add(sleep);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSleep", new { id = sleep.Id }, sleep);
        }

        // DELETE: api/Sleep/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSleep(int id)
        {
            var sleep = await _context.Sleeps.FindAsync(id);
            if (sleep == null)
            {
                return NotFound();
            }

            _context.Sleeps.Remove(sleep);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SleepExists(int id)
        {
            return _context.Sleeps.Any(e => e.Id == id);
        }
    }
}

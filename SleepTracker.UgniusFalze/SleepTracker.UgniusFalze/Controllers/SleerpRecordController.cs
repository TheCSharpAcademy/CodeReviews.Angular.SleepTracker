using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SleepTracker.UgniusFalze.Models;

namespace SleepTracker.UgniusFalze.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SleerpRecordController : ControllerBase
    {
        private readonly SleepRecordContext _context;

        public SleerpRecordController(SleepRecordContext context)
        {
            _context = context;
        }

        // GET: api/SleerpRecord
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SleepRecord>>> GetSleepRecords()
        {
            return await _context.SleepRecords.ToListAsync();
        }

        // GET: api/SleerpRecord/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SleepRecord>> GetSleepRecord(int id)
        {
            var sleepRecord = await _context.SleepRecords.FindAsync(id);

            if (sleepRecord == null)
            {
                return NotFound();
            }

            return sleepRecord;
        }

        // PUT: api/SleerpRecord/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSleepRecord(int id, SleepRecord sleepRecord)
        {
            if (id != sleepRecord.SleepRecordId)
            {
                return BadRequest();
            }

            _context.Entry(sleepRecord).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SleepRecordExists(id))
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

        // POST: api/SleerpRecord
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<SleepRecord>> PostSleepRecord(SleepRecord sleepRecord)
        {
            _context.SleepRecords.Add(sleepRecord);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSleepRecord", new { id = sleepRecord.SleepRecordId }, sleepRecord);
        }

        // DELETE: api/SleerpRecord/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSleepRecord(int id)
        {
            var sleepRecord = await _context.SleepRecords.FindAsync(id);
            if (sleepRecord == null)
            {
                return NotFound();
            }

            _context.SleepRecords.Remove(sleepRecord);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SleepRecordExists(int id)
        {
            return _context.SleepRecords.Any(e => e.SleepRecordId == id);
        }
    }
}

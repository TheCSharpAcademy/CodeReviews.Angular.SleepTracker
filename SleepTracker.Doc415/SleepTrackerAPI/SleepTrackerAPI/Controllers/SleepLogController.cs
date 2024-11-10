using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SleepTrackerAPI.Data;
using SleepTrackerAPI.Models;

namespace SleepTrackerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SleepLogController : ControllerBase
    {
        private readonly SleepContext _context;

        public SleepLogController(SleepContext context)
        {
            _context = context;
        }

        // GET: api/SleepLog
        [HttpGet]
        public async Task<ActionResult<LogsDTO>> GetSleepLogs(int pageNumber=1, int itemsPerPage=5,string date="undefined")
        {
            if (pageNumber <= 0 || itemsPerPage <= 0)
            {
                return BadRequest("Page number and items per page must be greater than zero.");
            }
            int skip = (pageNumber - 1) * itemsPerPage;
            IQueryable<SleepData> logsQuery = _context.SleepLogs
                             .OrderByDescending(log => log.Date)
                             .AsNoTracking();

            var totalLogs = _context.SleepLogs.Count();

            if (date!="undefined")
            {
                logsQuery=logsQuery.Where(log=>log.Date == date);
                totalLogs = logsQuery.Count();
            }

            var logs = await logsQuery
                        .Skip(skip)
                        .Take(itemsPerPage)
                        .ToListAsync();                 
            
            var result=new LogsDTO { logs=logs,logsCount=totalLogs};
            return Ok(result);
        }

        // GET: api/SleepLog/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SleepData>> GetSleepData(string id)
        {
            var sleepData = await _context.SleepLogs.FindAsync(id);

            if (sleepData == null)
            {
                return NotFound();
            }

            return sleepData;
        }

        // PUT: api/SleepLog/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSleepData(string id, SleepData sleepData)
        {
            if (id != sleepData.Id)
            {
                return BadRequest();
            }


            try
            {
                _context.Update(sleepData);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SleepDataExists(id))
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

        // POST: api/SleepLog
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<SleepData>> PostSleepData(SleepData sleepData)
        {
            var newId = Guid.NewGuid().ToString();
            try
            {
                sleepData.Id = newId;
                await _context.SleepLogs.AddAsync(sleepData);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (SleepDataExists(sleepData.Id))
                {
                    return Conflict();
                }
                else
                {
                    return BadRequest();
                }
            }

            return CreatedAtAction("GetSleepData", new { id = newId }, sleepData);
        }

        // DELETE: api/SleepLog/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSleepData(string id)
        {
            var sleepData = await _context.SleepLogs.FindAsync(id);
            if (sleepData == null)
            {
                return NotFound();
            }

            _context.SleepLogs.Remove(sleepData);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SleepDataExists(string id)
        {
            return _context.SleepLogs.Any(e => e.Id == id);
        }
    }
}

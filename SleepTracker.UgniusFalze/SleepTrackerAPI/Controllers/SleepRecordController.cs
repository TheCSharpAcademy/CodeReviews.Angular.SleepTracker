using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SleepTracker.UgniusFalze.Models;
using SleepTracker.UgniusFalze.Repositories;

namespace SleepTracker.UgniusFalze.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SleepRecordController : ControllerBase
    {
        private readonly ISleepRecordRepository _sleepRecordRepository;

        public SleepRecordController(ISleepRecordRepository repository)
        {
            _sleepRecordRepository = repository;
        }

        // GET: api/SleerpRecord
        [HttpGet(template:"{limit}/{page}", Name = "SleepRecordDate")]
        public async Task<ActionResult<IEnumerable<SleepRecordDTO>>> GetSleepRecords(int limit, int page, [FromQuery] int? month)
        {
            return await _sleepRecordRepository.GetRecords(month, limit, page);
        }

        // GET: api/SleerpRecord/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SleepRecord>> GetSleepRecord(int id)
        {
            var sleepRecord = await _sleepRecordRepository.GetSleepRecord(id);

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
            

            try
            {
                await _sleepRecordRepository.UpdateSleepRecord(sleepRecord);
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
            await _sleepRecordRepository.AddSleepRecord(sleepRecord);

            return CreatedAtAction("GetSleepRecord", new { id = sleepRecord.SleepRecordId }, sleepRecord);
        }

        // DELETE: api/SleerpRecord/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSleepRecord(int id)
        {
            var sleepRecord = await _sleepRecordRepository.GetSleepRecord(id);
            if (sleepRecord == null)
            {
                return NotFound();
            }

            await _sleepRecordRepository.DeleteSleepRecord(sleepRecord);

            return NoContent();
        }

        [HttpGet(template:"getCount", Name="FilteredSleepRecordDate")]
        public async Task<ActionResult<long>> GetSleepRecordCount([FromQuery] int? month)
        {
            return await _sleepRecordRepository.GetSleepRecordCount(month);
        }
        
        [HttpGet("getMonths")]
        public async Task<ActionResult<IEnumerable<int>>> GetSleepRecordMonths()
        {
            return await _sleepRecordRepository.GetMonths();
        }
        
        private bool SleepRecordExists(int id)
        {
            return _sleepRecordRepository.SleepRecordExists(id);
        }
    }
}

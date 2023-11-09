using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using kmakai.sleeptracker.angular.Data;
using kmakai.sleeptracker.angular.Models;
using Microsoft.EntityFrameworkCore;

namespace kmakai.sleeptracker.angular.Controllers;

[Route("api/sleeprecords")]
[ApiController]
public class RecordController : ControllerBase
{
    private readonly SleepTrackerContext _context;
    public RecordController(SleepTrackerContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Record>>> GetRecords()
    {
        return await _context.Records.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Record>> GetRecord(int id)
    {
        var record = await _context.Records.FindAsync(id);

        if (record == null)
        {
            return NotFound();
        }

        return record;
    }

    [HttpPost]
    public async Task<ActionResult<Record>> AddRecord(Record record)
    {
        _context.Records.Add(record);
        await _context.SaveChangesAsync();

        return CreatedAtAction("GetRecord", new { id = record.Id }, record);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteRecord(int id)
    {
        var record = await _context.Records.FindAsync(id);
        if (record == null)
        {
            return NotFound();
        }

        _context.Records.Remove(record);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}

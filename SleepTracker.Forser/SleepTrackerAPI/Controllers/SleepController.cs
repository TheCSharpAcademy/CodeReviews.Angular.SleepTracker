using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace SleepTrackerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SleepController : ControllerBase
    {
        private ISleepRepository _sleepRepository { get; set; }

        public SleepController(ISleepRepository sleepRepository)
        {
            _sleepRepository = sleepRepository;
        }

        [HttpGet("GetSleepRecordsWithoutFilter")]
        public async Task<IEnumerable<Sleep>> GetSleepRecordsWithoutFilter()
        {
            return await _sleepRepository.GetAllSleepAsync();
        }

        [HttpGet("GetSleepRecords")]
        public IActionResult GetSleepRecords([FromQuery] SleepParameters sleepParameters)
        {
            var sleepers = _sleepRepository.GetAll(sleepParameters);

            var metadata = new
            {
                sleepers.TotalCount,
                sleepers.PageSize,
                sleepers.CurrentPage,
                sleepers.TotalPages,
                sleepers.HasNext,
                sleepers.HasPrevious,
                sleepers.SleepType
            };

            Response.Headers.Add("X-Pagination", JsonSerializer.Serialize(metadata));

            return Ok(sleepers);
        }
        [HttpGet("GetSleepRecord/{id:int}")]
        public async Task<Sleep> GetSleepById(int id)
        {
            return await _sleepRepository.GetSleepByIdAsync(id);
        }
        [HttpPost("PostSleepRecord/")]
        public async Task<ActionResult<Sleep>> PostSleepRecord(Sleep sleep)
        {
            try
            {
                if (sleep == null)
                {
                    return BadRequest();
                }

                var sleepRecord = await _sleepRepository.CreateSleepAsync(sleep);

                return CreatedAtAction("GetSleepRecords", new { id = sleepRecord.Id }, sleepRecord);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error saving new Sleep record");
            }
        }
        [HttpPut("UpdateSleepRecord/{id:int}")]
        public async Task<ActionResult<Sleep>> UpdateSleepRecord(int id, Sleep sleep)
        {
            try
            {
                if (sleep == null)
                {
                    return BadRequest();
                }

                var sleepToUpdate = await _sleepRepository.GetSleepByIdAsync(id);

                if (sleepToUpdate == null)
                {
                    return NotFound($"Record with Id = {id} not found");
                }

                sleep.Id = id;
                return await _sleepRepository.UpdateSleepAsync(sleepToUpdate);
            }
            catch (Exception) 
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error updating sleep record");
            }
        }
        [HttpDelete("DeleteSleepRecord/{id:int}")]
        public IResult DeleteSleepRecord(int id)
        {
            bool isDeleted = _sleepRepository.DeleteSleepById(id);

            if (isDeleted)
            {
                return Results.NoContent();
            }
            else
            {
                return Results.StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
    }
}
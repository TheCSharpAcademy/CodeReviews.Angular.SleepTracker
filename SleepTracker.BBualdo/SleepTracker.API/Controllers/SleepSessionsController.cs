using Microsoft.AspNetCore.Mvc;
using SleepTracker.API.Models;
using SleepTracker.API.Repositories;

namespace SleepTracker.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class SleepSessionsController(ISleepSessionsRepository sessionsRepository) : ControllerBase
{
  private readonly ISleepSessionsRepository _sessionsRepository = sessionsRepository;

  [HttpGet]
  public async Task<ActionResult<IEnumerable<SleepSession>>> GetAllSessions()
  {
    IEnumerable<SleepSession> sessions = await _sessionsRepository.GetAllSessions();
    return Ok(sessions);
  }

  [HttpGet("{id}")]
  public async Task<ActionResult<SleepSession>> GetSession(int id)
  {
    SleepSession? session = await _sessionsRepository.GetSessionById(id);
    if (session == null) return NotFound();
    return Ok(session);
  }

  [HttpPost]
  public async Task<ActionResult> AddSession(SleepSession session)
  {
    if (session == null) return BadRequest();
    await _sessionsRepository.AddSession(session);
    return CreatedAtAction(nameof(AddSession), session);
  }

  [HttpPut("{id}")]
  public async Task<ActionResult> UpdateSession(int id, SleepSession session)
  {
    if (session == null) return BadRequest();
    if (session.Id != id) return NotFound();
    await _sessionsRepository.UpdateSession(session);
    return NoContent();
  }

  [HttpDelete("{id}")]
  public async Task<ActionResult> DeleteSession(int id)
  {
    await _sessionsRepository.DeleteSession(id);
    return NoContent();
  }
}

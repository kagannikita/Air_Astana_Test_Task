using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Models;
using Microsoft.AspNetCore.Authorization;
namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FlightScheduleController : ControllerBase
    {
        private readonly ApplicationContext _context;

        public FlightScheduleController(ApplicationContext context)
        {
            _context = context;
        }

        // GET: api/FlightSchedule
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FlightScheduleModel>>> GetFlightSchedules()
        {
            return await _context.FlightSchedules.ToListAsync();
        }


        // PUT: api/FlightSchedule/5
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> PutFlightSchedule(int id, FlightScheduleModel flightSchedule)
        {
            if (id != flightSchedule.FSId)
            {
                return BadRequest();
            }
            _context.Entry(flightSchedule).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FlightScheduleExists(id))
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
        // GET: api/FlightSchedule/5
        [HttpGet("{id}")]
       [Authorize(Roles = "Admin")]
        public async Task<ActionResult<FlightScheduleModel>> GetFlightSchedule(int id)
        {
            var flightSchedule = await _context.FlightSchedules.FindAsync(id);

            if (flightSchedule == null)
            {
                return NotFound();
            }

            return flightSchedule;
        }

        // POST: api/FlightSchedule
        [HttpPost]
       [Authorize(Roles = "Admin")]
        public async Task<ActionResult<FlightScheduleModel>> PostFlightSchedule(FlightScheduleModel flightSchedule)
        {
            _context.FlightSchedules.Add(flightSchedule);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFlightSchedule", new { id = flightSchedule.FSId }, flightSchedule);
        }

        // DELETE: api/FlightSchedule/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<FlightScheduleModel>> DeleteFlightSchedule(int id)
        {
            var flightSchedule = await _context.FlightSchedules.FindAsync(id);
            if (flightSchedule == null)
            {
                return NotFound();
            }

            _context.FlightSchedules.Remove(flightSchedule);
            await _context.SaveChangesAsync();

            return flightSchedule;
        }

        private bool FlightScheduleExists(int id)
        {
            return _context.FlightSchedules.Any(e => e.FSId == id);
        }
    }
}
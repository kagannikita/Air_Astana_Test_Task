using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using server.Models;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ServerController : ControllerBase
    {
        public ServerController(ApplicationContext context)
        {

        }

        // GET api/server
        [HttpGet]
        public ActionResult<IEnumerable<string>> Get()
        {
            return Content("Hello I'm a Server!!!!");
        }

    }
}
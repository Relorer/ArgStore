using BLL;
using Data.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ArgStore.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GamesController : ControllerBase
    {
        private readonly ILogger<GamesController> logger;
        private readonly IUnitOfWork baseContext;

        public GamesController(ILogger<GamesController> logger, IUnitOfWork baseContext)
        {
            this.logger = logger;
            this.baseContext = baseContext;
        }

        [HttpGet]
        public IEnumerable<Game> GetAll ()
        {
            return baseContext.Game.GetItems();
        }
    }
}

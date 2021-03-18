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
        public async Task<ActionResult<IEnumerable<Game>>> GetClients()
        {
            return new ActionResult<IEnumerable<Game>>(await baseContext.Game.GetItems());
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<Game>> GetById(int id)
        {
            var game = await baseContext.Game.GetItemByID(id);

            if (game == null)
            {
                return NotFound();
            }

            return game;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] Game game)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var gameFromDB = await baseContext.Game.GetItemByID(id);

            if (gameFromDB == null)
            {
                return NotFound();
            }

            gameFromDB.Name = game.Name;
            gameFromDB.Genres = game.Genres;
            gameFromDB.Price = game.Price;
            gameFromDB.PriceIncludingDiscount = game.PriceIncludingDiscount;
            gameFromDB.Rating = game.Rating;
            gameFromDB.ReleaseDate = game.ReleaseDate;
            gameFromDB.Description = game.Description;
            gameFromDB.CoverPath = game.CoverPath;
            gameFromDB.Comments = game.Comments;

            baseContext.Game.UpdateItem(gameFromDB);
            baseContext.Save();

            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult<Game>> Create(Game game)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var resultGame = await baseContext.Game.InsertItem(game);
            baseContext.Save();

            return resultGame;
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteClient(int id)
        {
            var game = await baseContext.Game.GetItemByID(id);

            if (game == null)
            {
                return NotFound();
            }

            baseContext.Game.DeleteItem(id);
            baseContext.Save();

            return NoContent();
        }
    }
}

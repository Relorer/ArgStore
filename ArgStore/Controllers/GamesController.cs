﻿using BLL;
using Data.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
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
        private readonly UserManager<User> userManager;

        public GamesController(ILogger<GamesController> logger, UserManager<User> userManager, IUnitOfWork baseContext)
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
        public async Task<ActionResult<Game>> GetById(string id)
        {
            var game = await baseContext.Game.GetItemByID(id);

            if (game == null)
            {
                return NotFound();
            }

            return game;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update([FromRoute] string id, [FromBody] Game game)
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
            gameFromDB.Discount = game.Discount;
            foreach (var item in game.Marks)
            {
                if (item.User != null) item.User = await baseContext.User.GetItemByID(item.User.Id);
            }
            gameFromDB.Marks = game.Marks;
            gameFromDB.ReleaseDate = game.ReleaseDate;
            gameFromDB.Description = game.Description;
            gameFromDB.Cover = game.Cover;
            gameFromDB.Comments = game.Comments;

            try
            {
                baseContext.Game.UpdateItem(gameFromDB);
                baseContext.Save();
            }

            catch (Exception e)
            {
                var a = e;
            }

            return NoContent();
        }

        //[Authorize(Roles = "admin")]
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

        [Authorize(Roles = "admin")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteClient(string id)
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

        private async Task<User> GetCurrentUserAsync()
        {
            return await userManager.GetUserAsync(HttpContext.User);
        }
    }
}

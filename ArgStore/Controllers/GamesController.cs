using BLL;
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

        /// <summary>
        /// Формирует список всех игр
        /// </summary>
        /// <returns>Список игр</returns>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Game>>> GetGames()
        {
            logger.LogInformation($"Вызов get запроса /Games.");
            return new ActionResult<IEnumerable<Game>>(await baseContext.Game.GetItems());
        }

        /// <summary>
        /// Получение игры по id
        /// </summary>
        /// <param name="id">id игры</param>
        /// <returns>Игра</returns>
        [HttpGet("{id}")]
        public async Task<ActionResult<Game>> GetById(string id)
        {
            logger.LogInformation($"Вызов get запроса /Games/{id}.");
            var game = await baseContext.Game.GetItemByID(id);

            if (game == null)
            {
                logger.LogWarning($"Игра с id '{id}' не найдена");
                return NotFound();
            }

            logger.LogInformation($"Игра {game.Name} успешно отправлена");
            return game;
        }

        /// <summary>
        /// Обновление игры
        /// </summary>
        /// <param name="id">id игры</param>
        /// <param name="game">игры</param>
        /// <returns>Сообщение об обновлении игры</returns>
        [HttpPut("{id}")]
        public async Task<IActionResult> Update([FromRoute] string id, [FromBody] Game game)
        {
            logger.LogInformation($"Вызов put запроса /Games/{id}.");
            if (!ModelState.IsValid)
            {
                logger.LogError($"BadRequest: {ModelState}");
                return BadRequest(ModelState);
            }

            var gameFromDB = await baseContext.Game.GetItemByID(id);

            if (gameFromDB == null)
            {
                logger.LogWarning($"Игра с id '{id}' не найдена");
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
                logger.LogError(e.Message, e);
            }

            logger.LogInformation($"Игра с id '{id}' была успешно обновлена");
            return NoContent();
        }

        /// <summary>
        /// Добавление новой игры в базу
        /// </summary>
        /// <param name="game">Игра</param>
        /// <returns>Информация о добавлении</returns>
        [HttpPost]
        public async Task<ActionResult<Game>> Create(Game game)
        {
            logger.LogInformation("Вызов post запроса /Games.");
            if (!ModelState.IsValid)
            {
                logger.LogError($"BadRequest: {ModelState}");
                return BadRequest(ModelState);
            }

            Game resultGame = null;
            try
            {
                resultGame = await baseContext.Game.InsertItem(game);
                baseContext.Save();
            }
            catch (Exception e)
            {
                logger.LogError(e.Message, e);
            }

            logger.LogInformation($"Игра {game?.Name} успешно создана");
            return resultGame;
        }

        /// <summary>
        /// Удаление игры из базы
        /// </summary>
        /// <param name="id">id игры</param>
        /// <returns>Информация об удалении</returns>
        [Authorize(Roles = "admin")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteGame(string id)
        {
            logger.LogInformation($"Вызов delete запроса /Games/{id}.");
            var game = await baseContext.Game.GetItemByID(id);

            if (game == null)
            {
                logger.LogWarning($"Игра с id '{id}' не найдена");
                return NotFound();
            }

            try
            {
                baseContext.Game.DeleteItem(id);
                baseContext.Save();
            }
            catch (Exception e)
            {
                logger.LogError(e.Message, e);
            }

            logger.LogInformation($"Игра с id '{id}' была успешно удалена");
            return NoContent();
        }
    }
}

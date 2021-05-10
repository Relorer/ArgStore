using ArgStore.Models;
using BLL;
using Data.Entities;
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
    [Produces("application/json")]
    public class AuthController : Controller
    {
        private readonly ILogger<AuthController> logger;
        private readonly IUnitOfWork baseContext;

        private readonly UserManager<User> userManager;
        private readonly SignInManager<User> signInManager;
        public AuthController(UserManager<User> userManager, SignInManager<User> signInManager, ILogger<AuthController> logger, IUnitOfWork baseContext)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.logger = logger;
            this.baseContext = baseContext;
        }

        [HttpPost]
        [Route("api/signup")]
        public async Task<IActionResult> Register([FromBody] SignupModel model)
        {
            logger.LogInformation("Вызов post запроса api/signup.");
            if (ModelState.IsValid)
            {
                User user = new User { UserName = model.Login, Basket = new Basket() };

                var result = await userManager.CreateAsync(user, model.Password);

                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(user, "user");
                    await signInManager.SignInAsync(user, false);
                    var msg = new
                    {
                        message = $"Добавлен новый пользователь: {user.UserName}"
                    };
                    logger.LogInformation(msg.message);
                    return Ok(msg);
                }
                else
                {
                    foreach (var error in result.Errors)
                    {
                        ModelState.AddModelError(string.Empty, error.Description);
                    }
                    var errorMsg = new
                    {
                        message = "Пользователь не добавлен.",
                        error = ModelState.Values.SelectMany(e => e.Errors.Select(er => er.ErrorMessage))
                    };
                    logger.LogError(errorMsg.message);
                    return BadRequest(errorMsg);
                }
            }
            else
            {
                var errorMsg = new
                {
                    message = "Неверные входные данные.",
                    error = ModelState.Values.SelectMany(e => e.Errors.Select(er => er.ErrorMessage))
                };
                logger.LogError(errorMsg.message);
                return BadRequest(errorMsg);
            }
        }

        [Route("api/signin")]
        public async Task<IActionResult> Login([FromBody] SigninModel model)
        {
            logger.LogInformation("Вызов post запроса api/signin.");
            if (ModelState.IsValid)
            {
                var result = await signInManager.PasswordSignInAsync(model.Login, model.Password, model.RememberMe, false);
                if (result.Succeeded)
                {
                    var msg = new
                    {
                        message = $"Выполнен вход пользователем: {model.Login}"
                    };
                    logger.LogInformation(msg.message);
                    return Ok(msg);
                }
                else
                {
                    ModelState.AddModelError("", "Неправильный логин и (или) пароль");
                    var errorMsg = new
                    {
                        message = "Вход не выполнен.",
                        error = ModelState.Values.SelectMany(e => e.Errors.Select(er => er.ErrorMessage))
                    };
                    logger.LogError(errorMsg.message);
                    return BadRequest(errorMsg);
                }
            }
            else
            {
                var errorMsg = new
                {
                    message = "Вход не выполнен.",
                    error = ModelState.Values.SelectMany(e => e.Errors.Select(er => er.ErrorMessage))
                };
                logger.LogError(errorMsg.message);
                return BadRequest(errorMsg);
            }
        }

        [HttpPost]
        [Route("api/signout")]
        public async Task<IActionResult> Signout()
        {
            logger.LogInformation("Вызов post запроса api/signout.");
            await signInManager.SignOutAsync();
            var msg = new
            {
                message = "Выполнен выход."
            };
            logger.LogInformation(msg.message);
            return Ok(msg);
        }

        [HttpPost]
        [Route("api/authinfo")]
        public async Task<IActionResult> AuthInfo()
        {
            logger.LogInformation("Вызов post запроса api/authinfo.");
            User user = await GetCurrentUserAsync();
            bool isAuth = user != null;
            string role = isAuth ? (await userManager.GetRolesAsync(user)).FirstOrDefault() : "noauth";

            var msg = new { isAuth, user, role };
            if (isAuth) logger.LogInformation("Пользователь авторизован");
            else logger.LogInformation("Пользователь не авторизован");
            return Ok(msg);
        }

        [HttpPost]
        [Route("api/basket/add")]
        public async Task<ActionResult<User>> AddGameToBasket(Game game)
        {
            logger.LogInformation("Вызов post запроса api/basket/add.");
            if (!ModelState.IsValid)
            {
                logger.LogError($"BadRequest: {ModelState}");
                return BadRequest(ModelState);
            }

            var user = await GetCurrentUserAsync();

            if (user != null)
            {
                user.Basket.BasketGames.Add(new BasketGame() { Game = await baseContext.Game.GetItemByID(game.Id) });

                try
                {
                    baseContext.Basket.UpdateItem(user.Basket);
                    baseContext.Save();
                }
                catch (Exception e)
                {
                    logger.LogError(e.Message, e);
                }

                logger.LogInformation($"Игра {game.Name} была добавлена в корзину пользователя {user.UserName}");
                return user;
            }
            else
            {
                var errorMsg = new
                {
                    message = "Вход не выполнен.",
                };
                logger.LogError(errorMsg.message);
                return BadRequest(errorMsg);
            }
        }

        [HttpDelete("api/basket/{id}")]
        public async Task<ActionResult<User>> DeleteGameToBasket(string id)
        {
            logger.LogInformation($"Вызов delete запроса api/basket/{id}.");
            if (!ModelState.IsValid)
            {
                logger.LogError($"BadRequest: {ModelState}");
                return BadRequest(ModelState);
            }

            var user = await GetCurrentUserAsync();

            if (user != null)
            {
                var temp = user.Basket.BasketGames.FirstOrDefault(bg => bg.Game.Id == id);
                if (temp != null) user.Basket.BasketGames.Remove(temp);

                try
                {
                    baseContext.Basket.UpdateItem(user.Basket);
                    baseContext.Save();
                }
                catch (Exception e)
                {
                    logger.LogError(e.Message, e);
                }

                logger.LogInformation($"Игра {temp.Game.Name} была удалена из корзины пользователя {user.UserName}");
                return user;
            }
            else
            {
                var errorMsg = new
                {
                    message = "Вход не выполнен.",
                };
                logger.LogError(errorMsg.message);
                return BadRequest(errorMsg);
            }
        }

        [HttpDelete("api/basket/clear")]
        public async Task<ActionResult<User>> ClearBasket()
        {
            logger.LogInformation("Вызов delete запроса api/basket/clear.");
            if (!ModelState.IsValid)
            {
                logger.LogError($"BadRequest: {ModelState}");
                return BadRequest(ModelState);
            }

            var user = await GetCurrentUserAsync();

            if (user != null)
            {
                user.Basket.BasketGames.Clear();

                try
                {
                    baseContext.Basket.UpdateItem(user.Basket);
                    baseContext.Save();
                }
                catch (Exception e)
                {
                    logger.LogError(e.Message, e);
                }

                logger.LogInformation($"Корзина пользователя {user.UserName} успешно очищена");
                return user;
            }
            else
            {
                var errorMsg = new
                {
                    message = "Вход не выполнен.",
                };
                logger.LogError(errorMsg.message);
                return BadRequest(errorMsg);
            }
        }

        private async Task<User> GetCurrentUserAsync()
        {
            var user = await userManager.GetUserAsync(HttpContext.User);

            if (user != null)
            {
                var baskets = await baseContext.Basket.GetItems();
                var basket = baskets.FirstOrDefault(b => b.User.Id == user.Id) ?? new Basket();

                basket.BasketGames = basket.BasketGames ?? new List<BasketGame>();
            }

            return user;
        }

    }
}

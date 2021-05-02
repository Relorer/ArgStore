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
        private readonly ILogger<GamesController> logger;
        private readonly IUnitOfWork baseContext;

        private readonly UserManager<User> userManager;
        private readonly SignInManager<User> signInManager;
        public AuthController(UserManager<User> userManager, SignInManager<User> signInManager, ILogger<GamesController> logger, IUnitOfWork baseContext)
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
            if (ModelState.IsValid)
            {
                User user = new User{ UserName = model.Login, Basket = new Basket() };

                var result = await userManager.CreateAsync(user, model.Password);

                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(user, "user");
                    await signInManager.SignInAsync(user, false);
                    var msg = new
                    {
                        message = $"Добавлен новый пользователь: {user.UserName}"
                    };
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
                return BadRequest(errorMsg);
            }
        }

        [Route("api/signin")]
        public async Task<IActionResult> Login([FromBody] SigninModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await signInManager.PasswordSignInAsync(model.Login, model.Password, model.RememberMe, false);
                if (result.Succeeded)
                {
                    var msg = new
                    {
                        message = $"Выполнен вход пользователем: {model.Login}"
                    };
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
                return BadRequest(errorMsg);
            }
        }

        [HttpPost]
        [Route("api/signout")]
        public async Task<IActionResult> Signout()
        {
            await signInManager.SignOutAsync();
            var msg = new
            {
                message = "Выполнен выход."
            };
            return Ok(msg);
        }

        [HttpPost]
        [Route("api/authinfo")]
        public async Task<IActionResult> AuthInfo()
        {
            User user = await GetCurrentUserAsync();
            bool isAuth = user != null;
            string role = isAuth ? (await userManager.GetRolesAsync(user)).FirstOrDefault() : "noauth";

            var msg = new { isAuth, user, role };
            return Ok(msg);
        }

        [HttpPost]
        [Route("api/basket/add")]
        public async Task<ActionResult<User>> AddGameToBasket(Game game)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            
            var user = await GetCurrentUserAsync();

            if (user != null)
            {
                user.Basket.BasketGames.Add(new BasketGame() { Game = game });
                baseContext.Basket.UpdateItem(user.Basket);
                baseContext.Save();

                return user;
            }
            else
            {
                var errorMsg = new
                {
                    message = "Вход не выполнен.",
                };
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

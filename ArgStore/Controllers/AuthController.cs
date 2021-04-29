using ArgStore.Models;
using Data.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ArgStore.Controllers
{
    [Produces("application/json")]
    public class AuthController : Controller
    {
        private readonly UserManager<User> userManager;
        private readonly SignInManager<User> signInManager;
        public AuthController(UserManager<User> userManager, SignInManager<User> signInManager)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
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
            string role = isAuth ? (await userManager.GetRolesAsync(user)).FirstOrDefault() : "";

            var msg = new { isAuth, user, role };
            return Ok(msg);
        }

        private Task<User> GetCurrentUserAsync() => userManager.GetUserAsync(HttpContext.User);

    }
}

using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Mvc;

namespace DemoCsfrToken.Controllers
{
    [ApiVersion("1.0")]
    [Route("api/v{version:apiVersion}")]
    public class HomeController : Controller
    {
        public HomeController()
        {
        }

        public IActionResult Index([FromServices] IAntiforgery antiforgery)
        {
            var tokens = antiforgery.GetAndStoreTokens(HttpContext);
            HttpContext.Response.Cookies.Append("XSRF-TOKEN", tokens.RequestToken, new CookieOptions { HttpOnly = false });
            return Ok(new { token = tokens.RequestToken });
        }

        [HttpPost("create")]
        [ValidateAntiForgeryToken]
        public IActionResult UpdateData([FromBody] object data)
        {
            if (!ModelState.IsValid)
            {
                foreach (var error in ModelState)
                {
                    // Logar erros específicos
                    Console.WriteLine($"{error.Key}: {string.Join(", ", error.Value.Errors)}");
                }
                return BadRequest(ModelState);
            }

            return Ok(data);
        }
    }
}
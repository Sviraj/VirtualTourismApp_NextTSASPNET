using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Net.NetworkInformation;
using System.Security.Claims;
using System.Text;
using VirualTourismApp.Services.Core.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Google;
using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Authentication.Cookies;
using VirualTourismApp.Services.Core.Interface;
using VirualTourismApp.Services.Core.DTOs;
using Microsoft.AspNetCore.WebUtilities;
using System.Net;
using Microsoft.Extensions.Logging;

namespace VirualTourismApp.Services.Core.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IConfiguration _configuration;
        private readonly IEmailService _emailService;
        private readonly ILogger<AuthController> _logger;

        public AuthController(UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager, RoleManager<IdentityRole> roleManager, IConfiguration configuration, IEmailService emailService, ILogger<AuthController> logger)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _roleManager = roleManager;
            _configuration = configuration;
            _emailService = emailService;
            _logger = logger;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserModel model)
        {

            if (!IsValidEmail(model.Username))
            {
                return BadRequest("Invalid email format.");
            }

            var user = new IdentityUser { UserName = model.Username };
            var result = await _userManager.CreateAsync(user, model.Password);

            if (result.Succeeded)
                return Ok(new { Message = "User registered successfully" });

            return BadRequest(result.Errors);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserModel model)
        {
            try
            {
                if (model == null || string.IsNullOrWhiteSpace(model.Username) || string.IsNullOrWhiteSpace(model.Password))
                {
                    return BadRequest(new { Message = "Invalid request. Username and password are required." });
                }

                // Attempt to find the user by username
                var user = await _userManager.FindByNameAsync(model.Username);
                if (user == null)
                {
                    return Unauthorized(new { Message = "Invalid username or password." });
                }

                // Verify the password
                if (!await _userManager.CheckPasswordAsync(user, model.Password))
                {
                    return Unauthorized(new { Message = "Invalid username or password." });
                }

                // Generate the JWT token
                var token = GenerateJwtToken(user);

                // Return the token and success message
                return Ok(new
                {
                    Message = "Login successful",
                    Token = token,
                    ExpiresIn = 3600,
                    Username = model.Username
                });
            }
            catch (ArgumentNullException ex)
            {
                // Handle null arguments (e.g., null model)
                return BadRequest(new { Message = $"Invalid input: {ex.Message}" });
            }
            catch (InvalidOperationException ex)
            {
                // Handle unexpected errors during user retrieval or validation
                return StatusCode(500, new { Message = $"An error occurred: {ex.Message}" });
            }
            catch (Exception ex)
            {
                // Handle all other exceptions
                _logger.LogError(ex, "An error occurred during {Action}: {Message}", nameof(Login), ex.Message);
                return StatusCode(500, new { Message = "An unexpected error occurred. Please try again later.", Details = ex.Message });
            }
        }



        private string GenerateJwtToken(IdentityUser user)
        {
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]!));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddHours(1),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        [HttpPost("add-role")]
        public async Task<IActionResult> AddRole([FromBody] string role)
        {
            try
            {
                if (!await _roleManager.RoleExistsAsync(role))
                {
                    var result = await _roleManager.CreateAsync(new IdentityRole(role));
                    if (result.Succeeded)
                    {
                        return Ok(new { message = "Role Added Succesfully" });
                    }
                    return BadRequest(result.Errors);
                }
                return BadRequest("Role Already Exists");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred during {Action}: {Message}", nameof(AddRole), ex.Message);
                return StatusCode(500, new { Message = "An unexpected error occurred. In Add-Role Section", Details = ex.Message });
            }
            
        }

        [HttpPost("assign-role")]
        public async Task<IActionResult> AssignRole([FromBody] UserRoleModel model)
        {
            var user = await _userManager.FindByNameAsync(model.Username);

            if (user == null)
            {
                return BadRequest("User not found");
            }

            try
            {
                var result = await _userManager.AddToRoleAsync(user, model.Role);

                if (result.Succeeded)
                {
                    return Ok(new { message = "Role assigned successfully" });
                }
                return BadRequest(result.Errors);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred during {Action}: {Message}", nameof(AssignRole), ex.Message);
                return StatusCode(500, new { Message = "An unexpected error occurred. In Assign-Role Section", Details = ex.Message });
            }
        }

        private bool IsValidEmail(string email)
        {
            var emailRegex = new Regex(@"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$");
            return emailRegex.IsMatch(email);
        }


        [HttpGet("google-login")]
        public IActionResult GoogleLogin()
        {
            var properties = new AuthenticationProperties
            {
                RedirectUri = Url.Action("GoogleResponse")
            };
            return Challenge(properties, GoogleDefaults.AuthenticationScheme);
        }

        [HttpGet("google-response")]
        public async Task<IActionResult> GoogleResponse()
        {
            try
            {
                var authenticateResult = await HttpContext.AuthenticateAsync(CookieAuthenticationDefaults.AuthenticationScheme);

                if (!authenticateResult.Succeeded)
                    return Unauthorized("Authentication failed.");

                // Extract user claims from the authenticated principal
                var claims = authenticateResult.Principal?.Identities?.FirstOrDefault()?.Claims;
                var googleEmail = claims?.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;
                var googleName = claims?.FirstOrDefault(c => c.Type == ClaimTypes.Name)?.Value;
                var googleId = claims?.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;

                if (string.IsNullOrEmpty(googleEmail) || string.IsNullOrEmpty(googleId))
                    return BadRequest("Failed to retrieve Google user details.");

                // Check if user exists using Google login
                var user = await _userManager.FindByLoginAsync("Google", googleId);

                if (user == null)
                {
                    // Check if user already exists with the same email
                    user = await _userManager.FindByEmailAsync(googleEmail);
                    if (user == null)
                    {
                        user = new IdentityUser
                        {
                            UserName = googleEmail,
                            Email = googleEmail
                        };

                        // Create user
                        var createResult = await _userManager.CreateAsync(user);
                        if (!createResult.Succeeded)
                            return BadRequest("Failed to create user.");
                    }

                    // Add Google login
                    var addLoginResult = await _userManager.AddLoginAsync(user,
                        new UserLoginInfo("Google", googleId, "Google"));
                    if (!addLoginResult.Succeeded)
                        return BadRequest("Failed to add Google login.");
                }

                // Generate JWT token for the user
                var token = GenerateJwtToken(user);
                var expiresIn = 3600;

                // Get the frontend URL from appsettings.json
                var clientAppUrl = _configuration["AppSettings:ClientAppUrl"];

                // Redirect to React app with the token
                var redirectUrl = $"{clientAppUrl}/login/callback?token={token}&expiresIn={expiresIn}";
                return Redirect(redirectUrl);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred during {Action}: {Message}", nameof(GoogleResponse), ex.Message);
                return StatusCode(500, new { Message = "An unexpected error occurred. In GoogleResponse Section", Details = ex.Message });
            }
            
        }

        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordDto model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null)
            {
                return BadRequest("User with this email does not exist.");
            }

            try
            {
                var token = await _userManager.GeneratePasswordResetTokenAsync(user);

                // Get the frontend URL from appsettings.json
                var clientAppUrl = _configuration["AppSettings:ClientAppUrl"];

                // token encoded before sending the client side
                var encodedToken = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(token));

                var resetLink = $"{clientAppUrl}/reset-password?token={encodedToken}&email={WebUtility.UrlEncode(model.Email)}";

                await _emailService.SendEmailAsync(
                    model.Email,
                    "Reset your password",
                    $"Please reset your password by clicking here: {resetLink}"
                );

                return Ok(new { message = "If your email is registered, you will receive a password reset link." });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred during {Action}: {Message}", nameof(ForgotPassword), ex.Message);
                return StatusCode(500, new { Message = "An unexpected error occurred. In ForgotPassword Section", Details = ex.Message });
            } 
        }

        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordDto model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null)
            {
                return BadRequest("Invalid user.");
            }

            try 
            {
                // token decodec 
                var decodedToken = Encoding.UTF8.GetString(WebEncoders.Base64UrlDecode(model.Token));
                //Console.WriteLine($"{decodedToken}");
                var resetResult = await _userManager.ResetPasswordAsync(user, decodedToken, model.NewPassword);
                if (!resetResult.Succeeded)
                {
                    return BadRequest(resetResult.Errors);
                }

                return Ok("Password has been reset successfully.");
            }
            catch (Exception ex) 
            {
                _logger.LogError(ex, "An error occurred during {Action}: {Message}", nameof(ForgotPassword), ex.Message);
                return StatusCode(500, new { Message = "An unexpected error occurred. In ForgotPassword Section", Details = ex.Message });
            }  
        }

        //[HttpPost("refresh-token")]
        //public async Task<IActionResult> RefreshToken([FromBody] RefreshTokenRequest request)
        //{
        //    var principal = GetPrincipalFromExpiredToken(request.Token);
        //    var username = principal.Identity.Name;
        //    var user = await _userManager.FindByNameAsync(username);

        //    if (user == null)
        //        return BadRequest("Invalid token");

        //    var newToken = GenerateJwtToken(user);

        //    return Ok(new
        //    {
        //        Token = newToken,
        //        ExpiresIn = 3600
        //    });
        //}

    }
}



namespace VirualTourismApp.Services.Core.Models
{
    public class UserModel
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public string? Email { get; set; }
        public string? PasswordHash { get; set; }
        public string? GoogleId { get; set; }
        public string? Name { get; set; }
    }
}

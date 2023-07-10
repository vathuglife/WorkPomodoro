using System.ComponentModel.DataAnnotations;

namespace WorkPomodoro_API.AccountAPI.Entity
{
    public class Account
    {
        [Key]
        public string? uid { get; set; }
        public string? name { get; set; }
        public string? username { get; set; }
        public string? password { get; set; }
        public string? role { get; set; }
        public bool status { get; set; }
    }
}

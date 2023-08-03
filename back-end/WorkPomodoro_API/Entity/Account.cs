using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;

namespace WorkPomodoro_API.Entity
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

        /*1 Account contains Many Tasks.*/
        public List<Task> ?tasks { get; set; }        
    }
}

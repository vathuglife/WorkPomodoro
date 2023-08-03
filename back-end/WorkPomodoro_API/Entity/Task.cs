using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WorkPomodoro_API.Entity
{
    public class Task
    {
        [Key] public string? tid { get; set; } 
        public string ?name { get; set; }    
        
        public int type { get; set; }
        /*For querying purposes from the database. 1 Task belongs to 1 Account.*/
        public string? uid { get; set; }
        [ForeignKey("uid")]
        public Account?account { get; set; }    
    }
}

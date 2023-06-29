using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WorkPomodoro_API.Entity
{
    public class Task
    {
        [Key] public string tid { get; set; } 
        public string name { get; set; }    
        public string details { get; set; } 
        public int status { get; set; }
        [ForeignKey("User")]  public string uid { get; set; } 
    }
}

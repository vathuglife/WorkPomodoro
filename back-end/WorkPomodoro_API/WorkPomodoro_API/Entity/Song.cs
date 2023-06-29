using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WorkPomodoro_API.Entity
{
    public class Song
    {
        [Key]
        public string sid { get; set; } 
        public string name { get; set; }    
        public string link { get; set; }    
        public int status { get; set; }
        [ForeignKey("User")]
        public string uid { get; set; } 
    }
}

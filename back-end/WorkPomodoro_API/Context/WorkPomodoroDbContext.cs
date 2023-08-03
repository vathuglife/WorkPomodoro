using Microsoft.EntityFrameworkCore;
using WorkPomodoro_API.Entity;

namespace WorkPomodoro_API.Context
{
    public class WorkPomodoroDbContext : DbContext
    {
        public WorkPomodoroDbContext(DbContextOptions<WorkPomodoroDbContext> options) : base(options)
        {

        }
        public virtual DbSet<Account> Accounts { get; set; }
        public virtual DbSet<Song> Songs { get; set; }
        public virtual DbSet<Entity.Task> Tasks { get; set; }

    }
}

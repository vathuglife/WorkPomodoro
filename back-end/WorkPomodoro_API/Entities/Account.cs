using System;
using System.Collections.Generic;

namespace WorkPomodoro_API.Entities;

public partial class Account
{
    public int Uid { get; set; }

    public string? Name { get; set; }

    public string ?Username { get; set; }

    public string ?Password { get; set; }

    public string ?Role { get; set; }
    public byte[] ?Image { get; set; }

    public bool? Status { get; set; }

    public virtual ICollection<Task> Tasks { get; set; } = new List<Task>();
}

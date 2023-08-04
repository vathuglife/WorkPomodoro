using System;
using System.Collections.Generic;

namespace WorkPomodoro_API.Entities;

public partial class Task
{
    public int Tid { get; set; }

    public string Name { get; set; }

    public bool? Type { get; set; }

    public int? Uid { get; set; }

    public virtual Account Account { get; set; }
}

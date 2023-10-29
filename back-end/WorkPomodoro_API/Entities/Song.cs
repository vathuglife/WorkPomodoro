using System;
using System.Collections.Generic;

namespace WorkPomodoro_API.Entities;

public partial class Song
{
    public int Id { get; set; }

    public string Title { get; set; }

    public string Duration { get; set; }

    public string Thumbnail { get; set; }

    public string Url { get; set; }

    public int? AccountUid { get; set; }
    public bool IsInPlaylist { get; set; }  

    public byte[] AudioBase64 { get; set; }

    public virtual Account Account { get; set; }
}

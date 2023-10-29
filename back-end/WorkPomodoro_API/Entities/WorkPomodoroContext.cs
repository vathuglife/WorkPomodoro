﻿using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace WorkPomodoro_API.Entities;

public partial class WorkPomodoroContext : DbContext
{
    public WorkPomodoroContext()
    {
    }

    public WorkPomodoroContext(DbContextOptions<WorkPomodoroContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Account> Accounts { get; set; }

    public virtual DbSet<Song> Songs { get; set; }

    public virtual DbSet<Task> Tasks { get; set; }


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Account>(entity =>
        {
            entity.HasKey(e => e.Uid).HasName("PK__accounts__DD701264A3FCF6EB");

            entity.ToTable("accounts");

            entity.Property(e => e.Uid).HasColumnName("uid");
            entity.Property(e => e.Image)
                .IsRequired()
                .HasDefaultValueSql("(0x)")
                .HasColumnName("image");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .HasColumnName("name");
            entity.Property(e => e.Password)
                .HasMaxLength(60)
                .IsUnicode(false)
                .IsFixedLength()
                .HasColumnName("password");
            entity.Property(e => e.Role)
                .HasMaxLength(2)
                .IsUnicode(false)
                .IsFixedLength()
                .HasColumnName("role");
            entity.Property(e => e.Status).HasColumnName("status");
            entity.Property(e => e.Username)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("username");
        });

        modelBuilder.Entity<Song>(entity =>
        {
            entity.HasIndex(e => e.AccountUid, "IX_Songs_accountUid");

            entity.Property(e => e.AccountUid).HasColumnName("accountUid");
            entity.Property(e => e.AudioBase64).HasColumnName("audioBase64");
            entity.Property(e => e.Duration).HasColumnName("duration");
            entity.Property(e => e.Thumbnail).HasColumnName("thumbnail");
            entity.Property(e => e.Title).HasColumnName("title");
            entity.Property(e => e.Url).HasColumnName("url");

            entity.HasOne(d => d.Account).WithMany(p => p.Songs).HasForeignKey(d => d.AccountUid);
        });

        modelBuilder.Entity<Task>(entity =>
        {
            entity.HasKey(e => e.Tid).HasName("PK__tasks__DC105B0FD8ECF246");

            entity.ToTable("tasks");

            entity.Property(e => e.Tid).HasColumnName("tid");
            entity.Property(e => e.Name).HasColumnName("name");
            entity.Property(e => e.Type).HasColumnName("type");
            entity.Property(e => e.Uid).HasColumnName("uid");

            entity.HasOne(d => d.Account).WithMany(p => p.Tasks)
                .HasForeignKey(d => d.Uid)
                .HasConstraintName("FK__tasks__uid__17036CC0");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}

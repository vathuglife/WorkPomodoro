
using Lib.AspNetCore.ServerSentEvents;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System;
using System.Reflection;
using System.Text;
using WorkPomodoro_API.AccountAPI.Queries.GetAccountDetails;
using WorkPomodoro_API.Entities;
using WorkPomodoro_API.Utilities;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = false;
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters()
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidAudience = builder.Configuration["Jwt:Audience"],
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        IssuerSigningKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
    };
});

builder.Services.AddAuthorization(auth =>
{
    auth.AddPolicy("Bearer", new AuthorizationPolicyBuilder()
        .AddAuthenticationSchemes(JwtBearerDefaults.AuthenticationScheme‌​)
        .RequireAuthenticatedUser().Build());
});


// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(
    option =>
    {
        option.SwaggerDoc("v1", new OpenApiInfo { Title = "WorkPomodoro_API", Version = "v1" });
        option.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
        {
            In = ParameterLocation.Header,
            Description = "Please enter a valid token",
            Name = "Authorization",
            Type = SecuritySchemeType.Http,
            BearerFormat = "JWT",
            Scheme = "Bearer"
        });
        option.AddSecurityRequirement(new OpenApiSecurityRequirement
            {
                {
                    new OpenApiSecurityScheme
                    {
                        Reference = new OpenApiReference
                        {
                            Type=ReferenceType.SecurityScheme,
                            Id="Bearer"
                        }
                    },
                    new string[]{}
                }
            });
    });



//var connString = Environment.GetEnvironmentVariable("DB_CONNECTION_STRING");
var connString = builder.Configuration.GetConnectionString("WorkPomodoroDB");
builder.Services.AddDbContext<WorkPomodoroContext>(
    options =>
    {
        options.UseSqlServer(connString);
        options.EnableSensitiveDataLogging();
    });
builder.Services.AddScoped<AccountUtils>();
builder.Services.AddMediatR(Assembly.GetExecutingAssembly());



var app = builder.Build();
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(builder => builder
                .AllowAnyHeader()
                .AllowAnyMethod()
                .SetIsOriginAllowed((host) => true)
                .AllowCredentials()
            );
app.UseHttpsRedirection();

//keep the middleware order.  
app.UseAuthentication();
app.UseAuthorization();


app.MapControllers();

//Apply automatic migrations to the Database within the Container.
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
    
    var context = services.GetRequiredService<WorkPomodoroContext>();
    var db = context.Database;
    var cStr = context.Database.GetConnectionString();
    logger.LogInformation("Migrating database...");

    //while (!db.CanConnect())
    //{
    //    logger.LogInformation("Database not ready yet; waiting...");
    //    Thread.Sleep(1000);
    //}

    context.Database.Migrate();
    
}

app.Run();


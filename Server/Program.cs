using BudgetingApp.Infrastructure;
using BudgetingApp.Repositories;
using BudgetingApp.Repositories.Interfaces;
using BudgetingApp.Services;
using BudgetingApp.Services.Interfaces;
using Dapper;

// Configure Dapper to map snake_case columns to PascalCase properties
DefaultTypeMap.MatchNamesWithUnderscores = true;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddSingleton<IDbConnectionFactory, DbConnectionFactory>();

// Repositories
builder.Services.AddScoped<IUsersRepository, UsersRepository>();
builder.Services.AddScoped<IUserInvitesRepository, UserInvitesRepository>();

// Services
builder.Services.AddScoped<IUsersService, UsersService>();
builder.Services.AddScoped<IUserInvitesService, UserInvitesService>();
builder.Services.AddScoped<IViewsService, ViewsService>();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins(
                "http://localhost:5173",
                "https://budgeting-app-web-neon.vercel.app")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors();

app.UseAuthorization();

app.MapControllers();

app.Run();

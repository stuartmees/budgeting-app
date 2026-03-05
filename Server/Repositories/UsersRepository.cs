using BudgetingApp.Infrastructure;
using BudgetingApp.Models.Entities;
using BudgetingApp.Repositories.Interfaces;
using Dapper;

namespace BudgetingApp.Repositories;

public class UsersRepository : IUsersRepository
{
    private readonly IDbConnectionFactory _connectionFactory;

    public UsersRepository(IDbConnectionFactory connectionFactory)
    {
        _connectionFactory = connectionFactory;
    }

    public async Task<User?> GetByIdAsync(int id)
    {
        using var connection = _connectionFactory.CreateConnection();
        return await connection.QueryFirstOrDefaultAsync<User>(
            "SELECT * FROM users WHERE id = @Id",
            new { Id = id });
    }

    public async Task<User?> GetByOktaIdAsync(string oktaId)
    {
        using var connection = _connectionFactory.CreateConnection();
        return await connection.QueryFirstOrDefaultAsync<User>(
            "SELECT * FROM users WHERE okta_id = @OktaId",
            new { OktaId = oktaId });
    }

    public async Task<User?> GetByEmailAsync(string email)
    {
        using var connection = _connectionFactory.CreateConnection();
        return await connection.QueryFirstOrDefaultAsync<User>(
            "SELECT * FROM users WHERE email = @Email",
            new { Email = email });
    }

    public async Task<User> CreateAsync(User user)
    {
        using var connection = _connectionFactory.CreateConnection();
        var id = await connection.ExecuteScalarAsync<int>(
            @"INSERT INTO users (okta_id, email, display_name)
              VALUES (@OktaId, @Email, @DisplayName)
              RETURNING id",
            user);
        user.Id = id;
        return user;
    }

    public async Task<User> UpdateAsync(User user)
    {
        using var connection = _connectionFactory.CreateConnection();
        await connection.ExecuteAsync(
            @"UPDATE users
              SET okta_id = @OktaId, email = @Email, display_name = @DisplayName
              WHERE id = @Id",
            user);
        return user;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        using var connection = _connectionFactory.CreateConnection();
        var rowsAffected = await connection.ExecuteAsync(
            "DELETE FROM users WHERE id = @Id",
            new { Id = id });
        return rowsAffected > 0;
    }
}

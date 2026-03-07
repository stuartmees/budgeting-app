using BudgetingApp.Infrastructure;
using BudgetingApp.Models.Entities;
using BudgetingApp.Repositories.Interfaces;
using Dapper;

namespace BudgetingApp.Repositories;

public class UserInvitesRepository : IUserInvitesRepository
{
    private readonly IDbConnectionFactory _connectionFactory;

    public UserInvitesRepository(IDbConnectionFactory connectionFactory)
    {
        _connectionFactory = connectionFactory;
    }

    public async Task<UserInvite?> GetByIdAsync(int id)
    {
        using var connection = _connectionFactory.CreateConnection();
        return await connection.QueryFirstOrDefaultAsync<UserInvite>(
            "SELECT * FROM user_invites WHERE id = @Id",
            new { Id = id });
    }

    public async Task<UserInvite?> GetByEmailAndCodeAsync(string email, string inviteCode)
    {
        using var connection = _connectionFactory.CreateConnection();
        return await connection.QueryFirstOrDefaultAsync<UserInvite>(
            @"SELECT * FROM user_invites
              WHERE email = @Email AND invite_code = @InviteCode AND used = FALSE",
            new { Email = email, InviteCode = inviteCode });
    }

    public async Task<UserInvite?> GetPendingByEmailAsync(string email)
    {
        using var connection = _connectionFactory.CreateConnection();
        return await connection.QueryFirstOrDefaultAsync<UserInvite>(
            @"SELECT * FROM user_invites
              WHERE email = @Email
              AND used = FALSE
              AND code_validated IS NOT NULL
              AND code_validated > NOW() - INTERVAL '15 minutes'",
            new { Email = email });
    }

    public async Task<bool> MarkCodeValidatedAsync(int id)
    {
        using var connection = _connectionFactory.CreateConnection();
        var rowsAffected = await connection.ExecuteAsync(
            "UPDATE user_invites SET code_validated = NOW() WHERE id = @Id",
            new { Id = id });
        return rowsAffected > 0;
    }

    public async Task<bool> MarkAsUsedAsync(int id)
    {
        using var connection = _connectionFactory.CreateConnection();
        var rowsAffected = await connection.ExecuteAsync(
            "UPDATE user_invites SET used = TRUE WHERE id = @Id",
            new { Id = id });
        return rowsAffected > 0;
    }
}

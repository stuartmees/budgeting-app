using BudgetingApp.Infrastructure;
using BudgetingApp.Models.Entities;
using Dapper;

namespace BudgetingApp.Repositories;

public class SignUpInvitesRepository : ISignUpInvitesRepository
{
    private readonly IDbConnectionFactory _connectionFactory;

    public SignUpInvitesRepository(IDbConnectionFactory connectionFactory)
    {
        _connectionFactory = connectionFactory;
    }

    public async Task<SignUpInvite?> GetByIdAsync(int id)
    {
        using var connection = _connectionFactory.CreateConnection();
        return await connection.QueryFirstOrDefaultAsync<SignUpInvite>(
            "SELECT * FROM sign_up_invites WHERE id = @Id",
            new { Id = id });
    }

    public async Task<SignUpInvite?> GetByEmailAndCodeAsync(string email, string code)
    {
        using var connection = _connectionFactory.CreateConnection();
        return await connection.QueryFirstOrDefaultAsync<SignUpInvite>(
            @"SELECT * FROM sign_up_invites
              WHERE email = @Email AND code = @Code AND used = FALSE",
            new { Email = email, Code = code });
    }

    public async Task<bool> MarkAsUsedAsync(int id)
    {
        using var connection = _connectionFactory.CreateConnection();
        var rowsAffected = await connection.ExecuteAsync(
            "UPDATE sign_up_invites SET used = TRUE WHERE id = @Id",
            new { Id = id });
        return rowsAffected > 0;
    }
}

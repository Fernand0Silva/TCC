const { sql } = require('../Database/BdConfig');

async function listarArtesaos() {
    const pool = await sql.connect();
    const data = await pool.request().query('SELECT * FROM tbl_Artesao');
    return data.recordset;
}

async function criarArtesao(Nome, Cidade, Rg, Cpf, Email, Telefone, Endereco, Idade) {
    const pool = await sql.connect();
    const result = await pool.request()
        .input('Nome', sql.NVarChar, Nome)
        .input('Cidade', sql.NVarChar, Cidade)
        .input('Rg', sql.NVarChar, Rg)
        .input('Cpf', sql.NVarChar, Cpf)
        .input('Email', sql.NVarChar, Email)
        .input('Telefone', sql.NVarChar, Telefone)
        .input('Endereco', sql.NVarChar, Endereco)
        .input('Idade', sql.Int, Idade)
        .query('INSERT INTO tbl_Artesao (Nome, Cidade, Rg, Cpf, Email, Telefone, Endereco, Idade) VALUES (@Nome, @Cidade, @Rg, @Cpf, @Email, @Telefone, @Endereco, @Idade); SELECT SCOPE_IDENTITY() AS Id');


        return result.recordset[0].Id; 
}

async function listarArtesaoPorId(id) {
    const pool = await sql.connect();
    const result = await pool.request()
        .input('Id', sql.Int, id)
        .query('SELECT * FROM tbl_Artesao WHERE Id = @Id');
    return result.recordset[0]; // Retorna o primeiro resultado
}

async function atualizarArtesao(id, Nome, Cidade, Rg, Cpf, Email, Telefone, Endereco, Idade) {
    const pool = await sql.connect();
    const result = await pool.request()
        .input('Id', sql.Int, id)
        .input('Nome', sql.NVarChar, Nome)
        .input('Cidade', sql.NVarChar, Cidade)
        .input('Rg', sql.NVarChar, Rg)
        .input('Cpf', sql.NVarChar, Cpf)
        .input('Email', sql.NVarChar, Email)
        .input('Telefone', sql.NVarChar, Telefone)
        .input('Endereco', sql.NVarChar, Endereco)
        .input('Idade', sql.Int, Idade)
        .query('UPDATE tbl_Artesao SET Nome = @Nome, Cidade = @Cidade, Rg = @Rg, Cpf = @Cpf, Email = @Email, Telefone = @Telefone, Endereco = @Endereco, Idade = @Idade WHERE Id = @Id');
    
    return result.rowsAffected[0]; // Retorna o número de linhas afetadas
    
}
module.exports = { listarArtesaos, criarArtesao,listarArtesaoPorId,atualizarArtesao };
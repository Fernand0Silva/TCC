const { sql } = require('../Database/BdConfig');


async function criarCadastro(Nome,Telefone,Senha) {
    const pool = await sql.connect();
    await pool.request()
    .input('Nome',sql.NVarChar,Nome)
    .input('Telefone',sql.NVarChar,Telefone)
    .input('Senha',sql.Int,Senha)
    .query('INSERT INTO tbl_Cadastro (Nome, Telefone, Senha) VALUES (@Nome, @Telefone, @Senha)'); 
      
}

module.exports = {criarCadastro};
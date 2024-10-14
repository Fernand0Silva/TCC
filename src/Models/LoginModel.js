const { sql } = require('../Database/BdConfig');

async function verificarCredenciais(Telefone, Senha) {
    const pool = await sql.connect();
    
    const resultado = await pool.request()
        .input('Telefone', sql.NVarChar, Telefone)
        .input('Senha', sql.NVarChar, Senha)
        .query('SELECT * FROM tbl_Cadastro WHERE Telefone = @Telefone AND Senha = @Senha');
    
    return resultado.recordset.length > 0;  // Retorna verdadeiro se houver um registro correspondente
}

module.exports = { verificarCredenciais };

const { sql } = require('../Database/BdConfig');
const jwt = require('jsonwebtoken');

async function verificarCredenciais(Telefone, Senha) {
    const pool = await sql.connect();
    
    const resultado = await pool.request()
        .input('Telefone', sql.NVarChar, Telefone)
        .input('Senha', sql.NVarChar, Senha)
        .query('SELECT * FROM tbl_Cadastro WHERE Telefone = @Telefone AND Senha = @Senha');

    if (resultado.recordset.length > 0) {
// Retorna verdadeiro se houver um registro correspondente
        const user = resultado.recordset[0];

        //gerar o token jwt
        const token = jwt.sign(
            { id:user.id, Telefone:user.Telefone},//Payload
            'secreta_key',//Chave secreta
            {expiresIn: '1h'}//Expiração do token
        );

        return{auth:true,token};//retorna token se credenciais corretas
    } else{
        return{auth:false,message: 'Credenciais inválidas'};
    } 
}

module.exports = { verificarCredenciais };
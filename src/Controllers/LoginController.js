const {verificarCredenciais} = require('../Models/LoginModel');

const sql = require('mssql');

async function fazerLogin(req, res) {
    const { Telefone, Senha } = req.body;

    if (!Telefone || !Senha) {
        return res.status(400).send('Telefone ou Senha ausentes');
    }

    try {
        const resultado = await verificarCredenciais(Telefone, Senha);
        
        if (resultado) {
            res.status(200).send('Login realizado com sucesso!');
        } else {
            res.status(401).send('Telefone ou Senha incorretos');
        }
    } catch (err) {
        console.error('Erro ao fazer login:', err);
        res.status(500).send('Erro ao fazer login');
    }
}

module.exports = { fazerLogin };

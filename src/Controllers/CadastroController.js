const {criarCadastro} = require('../Models/CadastroModel');

const sql = require('mssql'); 

async function inserirCadastro (req,res){
    const {Nome,Telefone,Senha} = req.body;
    if (!Nome || !Telefone || !Senha ) {
        return res.status(400).send('Nome, Telefone ou Senha ausentes');
    }

    try {
        await criarCadastro(Nome,Telefone, Senha,);
        res.status(201).send('Cadastro inserido com sucesso!');
    } catch (err) {
        console.error('Erro ao inserir cadastro:', err);
        res.status(500).send('Erro ao inserir cadastro');
    }
}

module.exports = {inserirCadastro};
const { listarArtesaos,criarArtesao,listarArtesaoPorId,atualizarArtesao} = require('../Models/ArtesaoModel');
const { sql } = require('../Database/BdConfig');

async function getArtesaos(req, res) {
    try {
        const artesaos = await listarArtesaos();
        return res.json(artesaos);
    } catch (err) {
        console.error('Erro ao consultar artesãos:', err);
        return res.status(500).send('Erro ao consultar artesãos');
    }
}

async function inserirArtesao(req, res) {
    const { Nome, Cidade, Rg, Cpf, Email, Telefone, Endereco, Idade } = req.body;


    if (!Nome || !Cidade || !Rg || !Cpf || !Email || !Telefone || !Endereco || !Idade) {
        return res.status(400).send('Nome, Cidade, Rg, Cpf, Email, Telefone, Endereço ou Idade ausentes' );
    }

    try {
        //console.log("Tentando inserir artesão...");
      const novoId =   await criarArtesao(Nome, Cidade, Rg, Cpf, Email, Telefone, Endereco, Idade);
        res.status(201).send(`Artesão inserido com sucesso! ID: ${novoId}`);
    } catch (err) {
        console.error('Erro ao inserir artesão:', err);
        res.status(500).send('Erro ao inserir artesão');
    }
}
async function listarArtesaoPorIdHandler(req, res) {
    const id = parseInt(req.params.id);

    try {
        const artesao = await listarArtesaoPorId(id);
        if (!artesao) {
            return res.status(404).send('Artesão não encontrado -_-');
        }
        res.json(artesao);
    } catch (err) {
        console.error('Erro ao consultar artesão:', err);
        res.status(500).send('Erro ao consultar artesão');
    }
}

async function atualizarArtesaoHandler(req, res) {
    const id = parseInt(req.params.id); // Pega o ID da URL
    const { Nome, Cidade, Rg, Cpf, Email, Telefone, Endereco, Idade } = req.body;


    if (!id) {
        return res.status(400).send('ID inválido');
    }

 
    if (!Nome && !Cidade && !Rg && !Cpf && !Email && !Telefone && !Endereco && !Idade) {
        return res.status(400).send('Nenhum dado para atualizar');
    }

    try {
        const rowsAffected = await atualizarArtesao(id, Nome, Cidade, Rg, Cpf, Email, Telefone, Endereco, Idade);
        
        if (rowsAffected === 0) {
            return res.status(404).send('Artesão não encontrado');
        }

        res.send('Artesão atualizado com sucesso');
    } catch (err) {
        console.error('Erro ao atualizar artesão:', err);
        res.status(500).send('Erro ao atualizar artesão');
    }
}

const deletarArtesao = async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const pool = await sql.connect();
        const resultado = await pool.request()
            .input('id', sql.Int, id)
            .query('DELETE FROM tbl_Artesao WHERE Id = @id');

       
        if (resultado.rowsAffected[0] === 0) {
            return res.status(404).send('Artesão não encontrado');
        }

        res.status(200).send('Artesão deletado com sucesso!');
    } catch (err) {
        console.error('Erro ao deletar artesão:', err);
        res.status(500).send('Erro ao deletar artesão');
    }
};

module.exports = { getArtesaos,inserirArtesao,listarArtesaoPorIdHandler,atualizarArtesaoHandler,deletarArtesao};
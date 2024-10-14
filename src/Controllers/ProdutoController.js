const { listarProdutos, criarProduto,listarProdutoPorId,atualizarProduto} = require('../Models/ProdutoModel');
const sql = require('mssql'); 


async function getProdutos(req, res) {
    try {
        const produtos = await listarProdutos();
        return res.json(produtos);
    } catch (err) {
        console.error('Erro ao consultar produtos:', err);
        return res.status(500).send('Erro ao consultar produtos');
    }
}
async function inserirProduto (req,res){
    const {Nome,Descricao,Preco} = req.body;
    if (!Nome || !Descricao || !Preco ) {
        return res.status(400).send('Nome, Descricao ou Preco ausentes');
    }

    try {
      
        await criarProduto(Nome,Descricao, Preco,);
        res.status(200).send({ message:'Produto inserido com sucesso!'});//,criarProduto
    } catch (err) {
        console.error('Erro ao inserir produto:', err);
        res.status(500).send({error: 'Erro ao inserir produto'});
    }
}
async function listarProdutoPorIdHandler(req, res) {
    const id = parseInt(req.params.id);

    try {
        const produto = await listarProdutoPorId(id);
        if (!produto) {
            return res.status(404).send('Produto não encontrado -_-');
        }
        res.json(produto);
    } catch (err) {
        console.error('Erro ao consultar produto:', err);
        res.status(500).send('Erro ao consultar produto');
    }
}
async function atualizarProdutoHandler(req, res) {
    const id = parseInt(req.params.id); // Pega o ID da URL
    const { Nome,Descricao,Preco } = req.body;


    if (!id) {
        return res.status(400).send('ID inválido');
    }

   
    if (!Nome && !Descricao && !Preco) {
        return res.status(400).send('Nenhum dado para atualizar');
    }

    try {
        const rowsAffected = await atualizarProduto(id, Nome, Descricao, Preco);
        
        if (rowsAffected === 0) {
            return res.status(404).send('Produto não encontrado');
        }

        res.send('Produto atualizado com sucesso');
    } catch (err) {
        console.error('Erro ao atualizar produto:', err);
        res.status(500).send('Erro ao atualizar produto');
    }
}
const deletarProduto = async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const pool = await sql.connect();
        const resultado = await pool.request()
            .input('id', sql.Int, id)
            .query('DELETE FROM tbl_Produto WHERE Id = @id');

        
        if (resultado.rowsAffected[0] === 0) {
            return res.status(404).send('Po não encontrado');
        }

        res.status(200).send('produto deletado com sucesso!');
    } catch (err) {
        console.error('Erro ao deletar produto:', err);
        res.status(500).send('Erro ao deletar produto');
    }
};


module.exports = { getProdutos,inserirProduto, listarProdutoPorIdHandler,atualizarProdutoHandler,deletarProduto };
const PesquisaModel = require('../Models/PesquisaModel');

async function search(req,res){
    const searchQuery = req.query.query; // Recebe o termo da URL (query string)

    if(!searchQuery){
        return res.status(400).send('Por favor, insira um termo de pesquisa');
    }
    try {
        const products = await PesquisaModel.searchProducts(searchQuery);
        res.status(200).json(products); // Retorna os produtos encontrados como JSON
    } catch (err) {
        res.status(500).send('Erro ao buscar produtos: ' + err.message);
    }
}
module.exports = {search};
// Routes/ProdutoRoutes.js
const express = require('express');
const { getProdutos,inserirProduto,listarProdutoPorIdHandler,atualizarProdutoHandler,deletarProduto} = require('../Controllers/ProdutoController');
const router = express.Router();

router.get('/', getProdutos);
router.post('/', inserirProduto);
router.get('/:id', listarProdutoPorIdHandler);
router.put('/:id', atualizarProdutoHandler);
router.delete('/:id', deletarProduto);

module.exports = router;

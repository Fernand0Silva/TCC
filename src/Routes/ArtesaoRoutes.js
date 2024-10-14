// Routes/ProdutoRoutes.js

const express = require('express');
const { getArtesaos,inserirArtesao,listarArtesaoPorIdHandler,atualizarArtesaoHandler,deletarArtesao } = require('../Controllers/ArtesaoController');
const router = express.Router();

router.post('/', inserirArtesao);
router.get('/', getArtesaos);
router.get('/:id', listarArtesaoPorIdHandler);
router.put('/:id', atualizarArtesaoHandler);
router.delete('/:id', deletarArtesao);

module.exports = router;

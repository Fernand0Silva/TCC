const express = require('express');
const { inserirCadastro} = require('../Controllers/CadastroController');
const router = express.Router();

router.post('/', inserirCadastro);


module.exports = router;
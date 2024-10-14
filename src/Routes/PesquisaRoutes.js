const express = require('express');
const PesquisarController = require('../Controllers/PesquisarController')
const router = express.Router();

router.get('/search', PesquisarController.search);

module.exports = router;
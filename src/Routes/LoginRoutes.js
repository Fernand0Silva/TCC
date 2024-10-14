const express = require('express');
const { fazerLogin } = require('../Controllers/LoginController');
const router = express.Router();

router.post('/', fazerLogin);

module.exports = router;

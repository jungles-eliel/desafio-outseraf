const express = require('express');
const { obterIndicados } = require('./../controllers/indicadosController');

const router = express.Router();

router.get('/indicados', obterIndicados);

module.exports = router;
const logger = require('../config/logger');

function errorHandler(err, req, res, next) {
    logger.error(`Erro: ${err.message}`);
    res.status(500).json({ error: err.message });
}

module.exports = errorHandler;
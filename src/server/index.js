require('dotenv').config();
const express = require('express');
const routes = require('../routes');
const logger = require('../config/logger');
const { initializeDatabase } = require('../config/database');
const errorHandler = require('../middlewares/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

initializeDatabase();

app.use('/api', routes);
app.use(errorHandler);

const server = app.listen(PORT, () => {
    logger.info(`Servidor rodando no ambiente ${process.env.NODE_ENV || 'development'} na porta ${PORT}`);
});

module.exports = { app, server };
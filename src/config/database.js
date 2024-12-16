const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const processarCSV = require('../utils/csvParser');
const logger = require('./logger');

const db = new sqlite3.Database(':memory:');

function initializeDatabase() {
    const csvPath = path.join(__dirname, '../../data/Movielist.csv');
    const records = processarCSV(csvPath);

    db.serialize(() => {
        db.run(`
            CREATE TABLE filmes (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                titulo TEXT NOT NULL,
                produtor TEXT NOT NULL,
                vencedor BOOLEAN NOT NULL,
                ano INTEGER NOT NULL
            )
        `);

        const stmt = db.prepare(`INSERT INTO filmes (titulo, produtor, vencedor, ano) VALUES (?, ?, ?, ?)`);
        records.forEach(record => {
            try {
                stmt.run(record.titulo, record.produtor, record.vencedor, record.ano);
                logger.info(`Registro inserido: ${JSON.stringify(record)}`);
            } catch (error) {
                logger.error(`Erro ao inserir registro: ${error.message}`);
            }
        });
        stmt.finalize();
    });
}

module.exports = { db, initializeDatabase };
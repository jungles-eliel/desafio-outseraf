const fs = require('fs');
const { parse } = require('csv-parse/sync');
const logger = require('../config/logger');

function validarRegistro(registro, indice) {
    const { year, title, producers, winner } = registro;

    if (!year || !title || !producers) {
        logger.error(`Linha ${indice + 1} inválida: ${JSON.stringify(registro)}`);
        throw new Error(`Dados ausentes ou inválidos na linha ${indice + 1} do CSV.`);
    }

    const vencedor = winner?.toLowerCase() === 'yes' ? 1 : 0;

    if (isNaN(parseInt(year))) {
        logger.error(`Linha ${indice + 1}: Ano inválido: ${year}`);
        throw new Error(`O campo 'year' deve ser um número na linha ${indice + 1}.`);
    }

    // Retorna o registro validado e formatado
    return {
        ano: parseInt(year, 10),
        titulo: title,
        produtor: producers,
        vencedor,
    };
}

function processarCSV(caminhoArquivo) {
    try {
        const conteudoArquivo = fs.readFileSync(caminhoArquivo, 'utf-8');

        const registros = parse(conteudoArquivo, {
            columns: true,
            delimiter: ';',
            trim: true,
            skip_empty_lines: true,
        });

        return registros.map((registro, indice) => validarRegistro(registro, indice));
    } catch (erro) {
        logger.error(`Erro ao processar o arquivo CSV: ${erro.message}`);
        throw new Error(`Falha ao processar o CSV: ${erro.message}`);
    }
}

module.exports = processarCSV;

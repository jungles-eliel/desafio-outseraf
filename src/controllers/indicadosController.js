const { db } = require('./../config/database');

function obterIndicados(req, res) {
    // Consulta para obter o menor intervalo
    db.all(`
        WITH Produtores AS (
            SELECT 
                produtor, 
                ano
            FROM filmes
            WHERE vencedor = 1
            ORDER BY produtor, ano
        )
        SELECT 
            p1.produtor, 
            p1.ano AS ano_inicial, 
            p2.ano AS ano_final, 
            (p2.ano - p1.ano) AS intervalo
        FROM Produtores p1
        JOIN Produtores p2 
            ON p1.produtor = p2.produtor
            AND p1.ano < p2.ano
        GROUP BY p1.produtor, p1.ano, p2.ano
        ORDER BY intervalo ASC
        LIMIT 1
    `, [], (err, menores) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        // Consulta para obter o maior intervalo
        db.all(`
            WITH Produtores AS (
                SELECT 
                    produtor, 
                    ano
                FROM filmes
                WHERE vencedor = 1
                ORDER BY produtor, ano
            )
            SELECT 
                p1.produtor, 
                p1.ano AS ano_inicial, 
                p2.ano AS ano_final, 
                (p2.ano - p1.ano) AS intervalo
            FROM Produtores p1
            JOIN Produtores p2 
                ON p1.produtor = p2.produtor
                AND p1.ano < p2.ano
            GROUP BY p1.produtor, p1.ano, p2.ano
            ORDER BY intervalo DESC
        `, [], (err, maiores) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            // Retornar o menor e o maior intervalo
            const minIntervalo = menores.length > 0 ? menores[0] : null;
            const maxIntervalo = maiores.length > 0 ? maiores[0] : null;

            res.json({ min: minIntervalo, max: maxIntervalo });
        });
    });
}

module.exports = { obterIndicados };

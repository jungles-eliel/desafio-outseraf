const request = require('supertest');
const { app, server } = require('../../src/server/index');

describe('Testes de integração: Indicados Controller', () => {
    afterAll(() => {
        server.close(); // Encerra o servidor após os testes
    });

    it('deve retornar o produtor com o maior intervalo entre prêmios', async () => {
        const response = await request(app).get('/api/indicados');

        expect(response.status).toBe(200);
        // Verificando a resposta para o produtor com maior intervalo
        expect(response.body.max.produtor).toBe('Bo Derek');
        expect(response.body.max.ano_inicial).toBe(1984);
        expect(response.body.max.ano_final).toBe(1990);
        expect(response.body.max.intervalo).toBe(6);
    });

    it('deve retornar o produtor com o menor intervalo entre prêmios', async () => {
        const response = await request(app).get('/api/indicados');

        expect(response.status).toBe(200);
        // Verificando a resposta para o produtor com menor intervalo
        expect(response.body.min.produtor).toBe('Bo Derek');
        expect(response.body.min.ano_inicial).toBe(1984);
        expect(response.body.min.ano_final).toBe(1990);
        expect(response.body.min.intervalo).toBe(6);
    });
});

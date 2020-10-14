const axios = require('axios');
const api = require('./api.bcb');

jest.mock('axios');

test('getCotacaoAPI', () => {
    const res = {
        data: {
            value: [
                { cotacaoVenda: 3.90 },
            ]
        }
    };

    axios.get.mockResolvedValue(res);

    api.getCotacaoAPI('url')
        .then(response => {
            expect(response).toEqual(res);
            expect(axios.get.mock.calls[0][0].toBe('url'));
        });
});

test('extractCotacao', () => {
    const res = {
        data: {
            value: [
                { cotacaoVenda: 3.90 },
            ]
        }
    };

    const cotacao = api.extractCotacao(res);

    expect(cotacao).toBe(3.90);
});

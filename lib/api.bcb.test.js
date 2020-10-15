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

describe('getToday', () => {
    const RealDate = Date;

    function mockDate(date) {
        global.Date = class extends RealDate {
            constructor() {
                return new RealDate(date);
            }
        };
    }

    afterEach(() => {
        global.Date = RealDate;
    })
    
    test('getToday', () => {
        mockDate('2020-01-01T12:00:00z');
        const today = api.getToday();
        expect(today).toBe('1-1-2020');
    });
});

test('getUrl', () => {
    const url = api.getUrl('MINHA-DATA');
    expect(url).toBe('as');
});

test('getCotacao', () => {
    const res = {
        data: {
            value: [
                { cotacaoVenda: 3.90 },
            ]
        }
    };

    const getToday = jest.fn();
    getToday.mockReturnValue('01-01-2020');

    const getUrl = jest.fn();
    getUrl.mockReturnValue('url');

    const getCotacaoAPI = jest.fn();
    getCotacaoAPI.mockResolvedValue(res);

    const extractCotacao = jest.fn();
    extractCotacao.mockReturnValue(3.9);
    
    api.pure
        .getCotacao({
            getToday,
            getUrl,
            getCotacaoAPI,
            extractCotacao
        })
        .then(res => {
            expect(res).toBe(3.9);
        });
});

const axios = require('axios');

const getUrl = data => `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='${data}'&$top=100&$format=json`;

const getToday = () => {
    const date = new Date();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();

    return `${month}-${day}-${year}`;
};

const getCotacaoAPI = url => axios.get(url);
const extractCotacao = res => res.data.value[0].cotacaoVenda;
const getCotacao = async () => {
    try {
        const today = getToday();
        const url = getUrl(today);
        const res = await getCotacaoAPI(url);
        const cotacao = extractCotacao(res);
        
        return cotacao;
    } catch (error) {
        console.log('erro', error);
        return '';
    }
}

module.exports = {
    getCotacaoAPI,
    getCotacao,
    extractCotacao,
};

const axios = require('axios');

const date = new Date();

const url = `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}'&$top=100&$format=json`;

const getCotacaoAPI = () => axios.get(url);
const extractCotacao = res => res.data.value[0].cotacaoVenda;
const getCotacao = async () => {
    const res = await getCotacaoAPI();
    const cotacao = extractCotacao(res);
    
    return cotacao;
}

module.exports = {
    getCotacaoAPI,
    getCotacao,
    extractCotacao,
};

const axios = require('axios');

const date = new Date();

const url = `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}'&$top=100&$format=json`;

axios.get(url)
    .then(res => console.log(res.data.value[0].cotacaoVenda));

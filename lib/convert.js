const convert = (cotacao, quantidade) => cotacao * quantidade

const toDolar = valor => Number(valor).toLocaleString('en-US', { style: 'currency', currency: 'USD' })
const toReal = valor => Number(valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }).replace('.', ',')

module.exports = {
    convert,
    toDolar,
    toReal
}

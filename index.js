const express = require('express')
const path = require('path')

const { convert, toDolar, toReal } = require('./lib/convert')

const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/cotacao', (req, res) => {
    const { cotacao, quantidade } = req.query
    
    if (Number(cotacao) && Number(quantidade)) {
        const conversao = convert(cotacao, quantidade)
    
        return res.render('cotacao', {
            error: false,
            cotacao: toReal(cotacao),
            quantidade: toDolar(quantidade),
            conversao: toReal(conversao)
        })
    } else {
        res.render('cotacao', {
            error: 'Valores inválidos'
        })
    }
})

app.listen(3000, err => {
    if (err) {
        console.log('Não foi possível iniciar a aplicação')
    } else {
        console.log('ConvertMyMoney está online')
    }
})

const express = require('express')
const path = require('path')

const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.render('home')
})

app.listen(3000, err => {
    if (err) {
        console.log('Não foi possível iniciar a aplicação')
    } else {
        console.log('ConvertMyMoney está online')
    }
})

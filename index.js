const express = require('express')
const app = express()

const PORT = 3000
const hostname = 'localhost'


/* ----------config do express-------------- */
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// Definindo que a pasta raiz do programa é o public
app.use(express.static('public'))


/* ----------arquivos estaticos-------------- */
app.use(express.static('public'))
/* ----------rotas do programa-------------- */
app.get('/', (req,res)=>{
    res.render('index.html')
})


// =======================================
app.listen(PORT, hostname, ()=>{
    console.log(`Servidor Rodando em ${hostname}:${PORT}`)
})


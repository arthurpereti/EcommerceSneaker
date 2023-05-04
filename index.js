const express = require('express')
const app = express()

const PORT = 3000
const hostname = 'localhost'

// Definindo que a pasta raiz do programa é o public
app.use(express.static('public'))


// =======================================
app.listen(PORT, hostname, ()=>{
    console.log(`Servidor Rodando em ${hostname}:${PORT}`)
})


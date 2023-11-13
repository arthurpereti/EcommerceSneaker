const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const conn = require('./db/conn')
const Usuario = require('./models/Usuario')

let log = false

const PORT = 3000
const hostname = 'localhost'

// ------ Config do express -------
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public')); // Definindo que a pasta raiz do programa é o public


// ------ config express-Handlebars ----- 
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.set('views', './views');


// ------ Rotas do sistema ------

app.post('/logjn', async (req,res)=>{
    const email = req.body.email
    const senha = req.body.senha
    const pesq = await Usuario.findOne({raw:true, where: {email:email && {senha:senha}}})
    console.log(pesq)
    if(pesq == null)(
        res.render('login', {log})
    );else(
        log = true,
        res.render('cadastrar', {log, nome: pesq.nome})
    )
})

app.get('/login', (req,res)=>{
    res.render('login')
})

app.get('/politicadecookie', (req, res) =>{
    res.render('politicadecookie')
})

app.get('/politicadeprivacidade',  (req, res) => {
    res.render('politicadeprivacidade');
});

app.get('/politicadetroca', (req, res) =>{
    res.render('politicadetroca')
})

app.get('/', (req, res) => {
    res.render('index', {log});
});

// =======================================
conn.sync().then(()=>{
    app.listen(PORT, hostname, () => {
        console.log(`Servidor Rodando em ${hostname}:${PORT}`)
    });
}).catch(()=>{
    console.log("Servidor não está rodando")
})


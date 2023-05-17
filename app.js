const express = require('express')
const app = express()
const exphbs = require('express-handlebars')

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
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/home', (req, res) => {
    res.render('index');
});

app.get('/teste', async (req, res) => {
    res.render('home');
});

app.get('/politicadecookie', async(req, res) =>{
    res.render('politicadecookie')
})

app.get('/politicadeprivacidade', async (req, res) => {
    res.render('politicadeprivacidade');
});

app.get('/politicadetroca', async(req, res) =>{
    res.render('politicadetroca')
})


// =======================================
app.listen(PORT, hostname, () => {
    console.log(`Servidor Rodando em ${hostname}:${PORT}`)
});

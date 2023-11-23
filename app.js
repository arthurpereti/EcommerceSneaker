const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const conn = require('./db/conn')
const Produto = require('./models/Produto')
const Usuario = require('./models/Usuario')


let log = false
let nomeuser = ""

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
app.get('/listarproduto', async (req,res)=>{
    const pesq = await Produto.findAll({raw:true})
    console.log(pesq)
    res.render('listarproduto', {valores: pesq, log, nomeuser})
})

app.post('/cadastrarproduto', async (req,res)=>{
    const nome = req.body.nome
    const preco = req.body.preco
    const quantidade = req.body.preco
    await Produto.create({nome:nome, preco:preco, quantidade:quantidade})
    res.render('gerenciador')

})

app.get('/cadastrarproduto', (req,res)=>{
    res.render('cadastrarproduto', {log, nomeuser})
})

app.get('/gerenciador', (req,res)=>{
    res.render('gerenciador', {log, nomeuser})
})

app.post('/login', async (req,res)=>{
    const email = req.body.email
    const senha = req.body.senha
    const pesq = await Usuario.findOne({raw:true, where:{email:email,senha:senha}})
    console.log(pesq)
    let msg = 'Usuário não Cadastrado'
    if(pesq == null){
        res.render('index', {msg})
    }else if(email == pesq.email && senha == pesq.senha && pesq.tipo == 'admin'){
        log = true
        nomeuser = pesq.nome
        res.render('index', {log, nomeuser})
    }else{
        res.render('index', {msg})
    }
})

app.get('/login', (req,res)=>{
    res.render('login', {log, nomeuser})
})

app.post('/cadastro', async (req,res)=>{
    const nome = req.body.nome
    const telefone = req.body.telefone
    const email = req.body.email
    const senha = req.body.senha
    const tipo = 'cliente'
    await Usuario.create({nome:nome,telefone:telefone,email:email,senha:senha, tipo:tipo})
    res.render('login', {log, nomeuser})
})

app.get('/cadastro', (req,res)=>{
    res.render('cadastro', {log, nomeuser})
})

app.get('/carrinho', (req,res)=>{
    res.render('carrinho', {log, nomeuser})
})

app.get('/politicadecookie', (req, res) =>{
    res.render('politicadecookie', {log, nomeuser})
})

app.get('/politicadeprivacidade',  (req, res) => {
    res.render('politicadeprivacidade', {log, nomeuser});
});

app.get('/politicadetroca', (req, res) =>{
    res.render('politicadetroca', {log, nomeuser})
})

app.get('/', (req, res) => {
    res.render('index', {log, nomeuser});
});

// =======================================
conn.sync().then(()=>{
    app.listen(PORT, hostname, () => {
        console.log(`Servidor Rodando em ${hostname}:${PORT}`)
    });
}).catch(()=>{
    console.log("Servidor não está rodando")
})


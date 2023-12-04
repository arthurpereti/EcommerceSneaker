const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const conn = require('./db/conn')
const Produto = require('./models/Produto')
const Usuario = require('./models/Usuario')


let log = false
let admin = false
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
app.post('/comprar', async (req, res) => {
    const dados_carrinho = req.body;
    console.log(dados_carrinho);

    const atualiza_promise = [];

    for (const item of dados_carrinho) {
        const produto = await Produto.findByPk(item.cod_prod, { raw: true });
        console.log(produto);

        if (!produto || produto.quantidade < item.qtde) {
            return res.status(400).json({ message: "Produto insuficiente ou não disponível" });
        }

        const novaquantidade = produto.quantidade - item.qtde;

        // Atualize o estoque no banco de dados
        const atualiza_promessa = await Produto.update(
            { quantidade: novaquantidade },
            { where: { id: item.cod_prod } }
        );

        atualiza_promise.push(atualiza_promessa);
    }

    try {
        await Promise.all(atualiza_promise);
        res.status(200).json({ message: "Compra realizada com sucesso!" });
    } catch (error) {
        console.error("Erro ao atualizar os dados" + error);
        res.status(500).json({ message: "Erro ao processar a compra" });
    }
});


app.get('/logout', (req,res)=>{
    log = false,
    res.render('index', {log, nomeuser, admin})
})

app.post('/apagarproduto', async (req,res)=>{
    const nomeproduto = req.body.nomeproduto
    await Produto.destroy({where:{nome:nomeproduto}})
    res.render('apagarproduto', {log, nomeuser, admin})
})

app.get('/apagarproduto', (req,res)=>{
    res.render('apagarproduto', {log, nomeuser, admin})
})

app.get('/listarproduto', async (req,res)=>{
    const pesq = await Produto.findAll({raw:true})
    console.log(pesq)
    res.render('listarproduto', {valores: pesq, log, nomeuser, admin})
})

app.post('/cadastrarproduto', async (req,res)=>{
    const nome = req.body.nome
    const preco = req.body.preco
    const quantidade = req.body.preco
    await Produto.create({nome:nome, preco:preco, quantidade:quantidade})
    res.render('gerenciador')

})

app.get('/cadastrarproduto', (req,res)=>{
    res.render('cadastrarproduto', {log, nomeuser, admin})
})

app.get('/gerenciador', (req,res)=>{
    res.render('gerenciador', {log, nomeuser, admin})
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
        admin = true
        nomeuser = pesq.nome
        res.render('index', {log, nomeuser, admin})
    }else if(email == pesq.email && senha == pesq.senha && pesq.tipo == 'cliente'){
        log = true
        nomeuser = pesq.nome
        res.render('index', {log, nomeuser})
    }
    else{
        res.render('index', {msg})
    }
})

app.get('/login', (req,res)=>{
    res.render('login', {log, nomeuser, admin})
})

app.post('/cadastro', async (req,res)=>{
    const nome = req.body.nome
    const telefone = req.body.telefone
    const email = req.body.email
    const senha = req.body.senha
    const tipo = 'cliente'
    await Usuario.create({nome:nome,telefone:telefone,email:email,senha:senha, tipo:tipo})
    res.render('login', {log, nomeuser, admin})
})

app.get('/cadastro', (req,res)=>{
    res.render('cadastro', {log, nomeuser, admin})
})

app.get('/carrinho', (req,res)=>{
    res.render('carrinho', {log, nomeuser, admin})
})

app.get('/politicadecookie', (req, res) =>{
    res.render('politicadecookie', {log, nomeuser, admin})
})

app.get('/politicadeprivacidade',  (req, res) => {
    res.render('politicadeprivacidade', {log, nomeuser, admin});
});

app.get('/politicadetroca', (req, res) =>{
    res.render('politicadetroca', {log, nomeuser, admin})
})

app.get('/', (req, res) => {
    res.render('index', {log, nomeuser, admin});
});

// =======================================
conn.sync().then(()=>{
    app.listen(PORT, hostname, () => {
        console.log(`Servidor Rodando em ${hostname}:${PORT}`)
    });
}).catch(()=>{
    console.log("Servidor não está rodando")
})


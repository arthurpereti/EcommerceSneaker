const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
 
const PORT = 3000                 // Definindo a porta para 3000
const hostname = 'localhost'      // definindo o hostname para o localhost

// ------ Config do express -------
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static('public')); // Definindo que a pasta raiz do programa é o public


// // ------ Config do express-handlebars ------
// app.engine('handlebars', exphbs.engine());
// app.set('view engine', 'handlebars');
// app.set('views', '/views');

// // ------ Rotas do site ------
// app.get('/', (req, res) => {
//     res.render('home');
// });

// app.get('/teste', async (req,res)=>{
//     res.render('teste')
// }) 

// =======================================
app.listen(PORT, hostname, ()=>{
    console.log(`Servidor Rodando em ${hostname}:${PORT}`)
});


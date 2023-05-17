const express = require('express')
const app = express()
const exphbs = require('express-handlebars')

// ------ Config do express -------
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static('public')); // Definindo que a pasta raiz do programa é o public


// ------ config express-Handlebars ----- 
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.set('views', './views');


// Rotas do sistema
app.get('/home', (req, res) => {
    res.render('index.handlebars');
});

app.get('/teste', async (req,res)=>{
    res.render('home.handlebars')
})

app.listen(3000);
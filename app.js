const express = require('express');
const app = express();
const mysql = require('mysql');

const bodyparser = require('body-parser');
const path = require('path');

app.listen('3000',()=>{
    console.log("Servidor Rodando!");
});

//Body Parser
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));

// Conexão com o Banco
const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'node'
});

db.connect(function(err){
    if(err)
    {
        console.log("Não foi possível conectar no banco!")
    }
})
app.get('/',function(req,res){
    let query = db.query("SELECT * FROM clientes",function(err,results){
    res.render('index',{lista:results});
    });
});

app.get('/registrar',function(req,res){
    res.render('cadastro',{});
})

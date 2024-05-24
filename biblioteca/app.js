const express = require('express');
const bodyParser = require('body-parser');

const mysql = require('mysql2');

const app = express();
const port = 5000;

const db = mysql.createConnection({
    host:'localhost',
    user :'Gabriel',
    password :'SENAI123',
    database : 'biblioteca'
})

db.connect((error)=>{
    if(error){
        console.log('Erro ao conectar com o MySql')
    } else{
        console.log('Conectado ao SQL')
    }
})

    app.use(bodyParser.urlencoded({ extended: true }));

    app.get("/", (req, res)=>{
        res.sendFile(__dirname + '/index.html')
    })
app.post ("/login", (req, res)=>{

    const username = req.body.usuario
    const password = req.body.senha
    
    console.log(username)
    console.log(password)

    db.query('SELECT password FROM user WHERE username = ? ', [username], (error, results)=>{

    
        if (results.length > 0 ){

        const passwordBD = results [0].password;
        if (passwordBD == password){
            
        res.sendFile(__dirname + '/pg_inicial.html')
        console.log('Usuario Encontrado');
        console.log('Senha Correta');
        
        } else{
            res.sendFile(__dirname + '/erro.html')
            console.log('Usuario Encontrado')
            console.log('Senha Incorreta')
         } 
         } else{
            res.sendFile(__dirname + '/erro.html')
            console.log('Usuario não cadastrado')
         }
        

       
    })

});

app.get("/cadastro", (req, res)=>{
    res.sendFile(__dirname + '/cadastro.html')
})

app.post("/registro", (req, res) => {
    const user = req.body.username;
    const password = req.body.password;
    const confirma = req.body.confirma;

    if (password === confirma){
        db.query('insert into user (username, password) values (?,?);', [user, password], (error, results)=>{ 
            if (error){
                console.log('Erro ao inserir usuário', error);
            }else {
                console.log('novo usuario autenticado');
                res.sendFile(__dirname+ '/index.html')
                }
            });
        }else{
            console.log('Senhas Divergentes')
        }
        });
app.listen(port, ()=>{
    console.log(`Servidor rodando no endereço: http://localhost:${port}`)
})
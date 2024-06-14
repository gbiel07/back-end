const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'Gabriel',
    password: 'SENAI123',
    database: 'biblioteca'
});


db.connect((error) => {
    if (error) {
        console.log("Erro ao contectar com o Banco de Dados")
    } else {
        console.log("Conectado ao MySQL")
    }
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.use(bodyParser.urlencoded({ extended: true }));


// LOGIN
app.post("/login", (req, res) => {
    const username = req.body.username
    const password = req.body.password


    
        db.query('select password from usuario where username= ?', [username], (error, results) => {
            if (results.length > 0) {
            const passwordBD = results[0].password;
            if (passwordBD === password) {
                console.log('Senha correta!');
                res.sendFile(__dirname + '/pagina.html')
            } else {
                console.log('Senha incorreta!');
                res.sendFile(__dirname + '/erro.html')
            };

        } else {
            console.log('Usuario não cadastrado!');
        }
    })
});


app.get("/cadastro", (req, res) => {
    res.sendFile(__dirname + '/cadastro.html');
    
});

app.post("/registro", (req, res) => {
    const user = req.body.username;
    const password = req.body.password;
    const confirm = req.body.confirmPassword;
    const email = req.body.email;

    if (password !== confirm) {   
        console.log('Senhas Divergentes')
        res.sendFile(__dirname + '/erro.html'); // Envia para a página de erro
    } else {
        db.query('INSERT INTO usuario (username, email, password) VALUES (?, ?, ?)', [user, email, password], (error, results) => {
            if (error) {
                console.error("Erro ao inserir usuário no banco de dados:", error);
                res.sendFile(__dirname + '/erro.html'); // Envia para a página de erro
            } else {
                console.log('Usuário cadastrado com sucesso!');
                res.sendFile(__dirname + '/index.html'); // Envia para a página inicial
            }
        });
    }
});


app.get("/email", (req, res) => {
    document.getElementById("cadastroForm").addEventListener("submit", function(event){
        const email = document.getElementById("email").value;
        if (!email.includes("@")) {
            alert("Por favor, insira um endereço de email válido.");
            event.preventDefault();
        }
    })
 });


app.listen(port, () => {
    console.log(`Servidor rodando no endereço: http://localhost:${port}`)
})
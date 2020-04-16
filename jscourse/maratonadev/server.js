// Server configuration
const express = require("express")
const server = express()

//Config the server to presentate static files
server.use(express.static('public'))

// Body Form Habilitation
server.use(express.urlencoded({ extended: true}))

//Configuring Database Connection
const Pool = require('pg').Pool
const db = new Pool({
    user: 'postgres',
    password: '0000',
    host:'localhost',
    port: 5432,
    database: 'doe'
})

// Template Engine Configuration
const nunjucks = require("nunjucks")
nunjucks.configure("./", {
    express: server,
    noCache: true,
})


// Configurating page presentation
server.get("/", function(req, res) {
    
    db.query("SELECT * FROM donors", function(err, result) {
        if (err) return res.send("Erro de banco de dados.")

        const donors = result.rows
        return res.render("index.html", { donors })
    })
    
})

server.post("/", function(req, res) {
    // Taking forms data
    const name = req.body.name
    const email = req.body.email
    const blood = req.body.blood

    // Putting values on database
    
    if (name == "" || email == "" || blood == "")
    {
        return res.send("Todos os campos são obrigatórios.")
    }

    const query = `
        INSERT INTO donors ("name","email","blood") 
        VALUES($1, $2, $3)`

    const values = [name, email, blood]

    db.query(query, values, function(err) {

        //Fluxo de erro
        if (err) return res.send("Erro no banco de dados.")

        //Fluxo ideal
        return res.redirect("/")
    })
    
})


/* Init the server and permitting the acess to port 3000*/
server.listen(3000, function() {
    console.log("Iniciei o servidor.")
})
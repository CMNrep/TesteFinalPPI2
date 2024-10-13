import express from "express";
import autenticar from "./Frontend/security/autenticacao.js";
import {verificarAutenticacao, logout} from "./Frontend/security/autenticacao.js";
import session from "express-session";
import rotaCandidato from "./Backend/routes/candidatoRota.js";
import rotaPartido from "./Backend/routes/partidoRota.js";


const app = express();
const port = 3000;
const host = "0.0.0.0";

app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    cookie: { 
        maxAge: 1000 * 60 * 30
    }

}))

app.use(express.static('./Frontend/public'));



app.get("/login", (req, res) => {
    res.redirect("/login.html");
})

app.get("/logout", logout)

app.post("/login", autenticar)

app.use(verificarAutenticacao , express.static('./Frontend/private'));


app.listen(port, host, () => {
    console.log(`frontend rodando em http://${host}:${port}`);
});

const backApp = express();
const backPort = 4000;
const backHost = "0.0.0.0";

backApp.use(express.json());

backApp.use("/candidato", rotaCandidato)
backApp.use("/partido", rotaPartido)

backApp.listen(backPort, backHost, () => {
    console.log(`Backend rodando em http://${backHost}:${backPort}`);
});


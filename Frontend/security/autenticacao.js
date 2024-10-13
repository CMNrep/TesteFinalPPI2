export default function autenticar(req, res) {
    const usuario = req.body.usuario;
    const senha = req.body.senha;
    
    if(usuario == 'admin' && senha == '123') {
        req.session.autenticado = true
        res.redirect('./menu.html');
    }
    else{
        res.redirect("/falhalogin.html");
    }
}

export function verificarAutenticacao(req, res, next) {
    if (req.session.autenticado && req.session.autenticado != undefined) {
        next();
    }
    else {
        res.redirect("./login.html");
    } 
}

export function logout(req, res) {
    req.session.autenticado = undefined;
    res.redirect("./login.html");
}
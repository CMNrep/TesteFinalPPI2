import Candidato from "../models/Candidato.js"

export default class CandidatoCTRL {

    gravar(req, res){
        if(req.method == "POST" && req.is('application/json')){
            const dados = req.body
            const nome = dados.nome
            const partido = dados.partido
            const num = dados.num
            if(nome && partido && num){
                const candidato = new Candidato( num,  nome, partido)
                candidato.gravar().then(() => {
                    res.status(201).json({
                        "status": true,
                        "message": "Candidato gravado com sucesso"
                    })
                }).catch((error) => {
                    res.status(500).json({
                        "status": false,
                        "message": error
                    })
                })  
            }
        }
        else{
            res.status(405).json({
                "status": false,
                "message": "Metodo não permitido"
            })
        }
    }
    alterar(req, res){
        if(req.method == "PUT" && req.is('application/json')){
            const dados = req.body
            const nome = dados.nome
            const partido = dados.partido
            const num = dados.num
            if(nome && partido && num){
                const candidato = new Candidato( num,  nome, partido)
                candidato.alterar().then(() => {
                    res.status(201).json({
                        "status": true,
                        "message": "Candidato alterado com sucesso"
                    })
                }).catch((error) => {
                    res.status(500).json({
                        "status": false,
                        "message": error
                    })
                })  
            }
        }
    }
    excluir(req, res){

    }
    consultar(req, res){

    }

     
}
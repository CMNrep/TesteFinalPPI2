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
                    res.status(200).json({
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
        if(req.method == "PUT" || req.method == "PATCH" && req.is('application/json')){
            const dados = req.body
            const nome = dados.nome
            const partido = dados.partido
            const num = dados.num
            if(nome && partido && num){
                const candidato = new Candidato( num,  nome, partido)
                candidato.alterar().then(() => {
                    res.status(200).json({
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
            else{
                res.status(400).json({
                    "status": false,
                    "message": "Informe todos os dados"
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
    excluir(req, res){
        if(req.method == "DELETE" && req.is('application/json')){
            const dados = req.body
            const nome = dados.nome
            if(nome){ 
                const candidato = new Candidato( "",  nome)
                candidato.excluir().then(() => {
                    res.status(200).json({
                        "status": true,
                        "message": "Candidato excluido com sucesso"
                    })
                }).catch((error) => {
                    res.status(500).json({
                        "status": false,
                        "message": error
                    })
                })  
            }
            else{
                res.status(400).json({
                    "status": false,
                    "message": "Informe o nome do candidato"
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
    consultar(req, res){
        let termo = req.params.termo
        if(!termo){
            termo = ""
        }
        if(req.method == "GET"){
            
            const candidato = new Candidato()
            candidato.consultar(termo).then((candidatos) => {
                res.status(200).json({
                    "status": true,
                    "message": candidatos
                })
            }).catch((error) => {
                res.status(500).json({
                    "status": false,
                    "message": error
                })
            })  
        }else{
            res.status(405).json({
                "status": false,
                "message": "Metodo não permitido"
            })
        }
    }     
}
import Partido from "../models/Partido.js"

export default class PartidoCTRL {

    gravar(req, res){
        if(req.method == "POST" && req.is('application/json')){
            const dados = req.body
            const nome = dados.nome
            const sigla = dados.sigla
            const num = dados.num
            if(nome && sigla && num){
                const partido = new Partido( num,  nome, sigla)
                partido.gravar().then(() => {
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
            const sigla = dados.sigla
            const num = dados.num
            if(nome && sigla && num){
                const partido = new Partido( num,  nome, sigla)
                partido.alterar().then(() => {
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
                const partido = new Partido( "",  nome)
                partido.excluir().then(() => {
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
            
            const partido = new Partido()
            partido.consultar(termo).then((candidatos) => {
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
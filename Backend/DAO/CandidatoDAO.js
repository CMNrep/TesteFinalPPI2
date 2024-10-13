import conectar from './Conexao.js'
import Candidato from '../models/Candidato.js'

export default class CandidatoDAO {
    
    constructor() {
        this.init()
    }

    async init() {
        try{
            const conexao = await conectar()
            const sql = `CREATE TABLE IF NOT EXISTS candidatos (
            can_nome VARCHAR(50) not null, 
            can_partido VARCHAR(50), 
            can_num VARCHAR(8),
            constraint pk_candidato PRIMARY KEY (can_nome));`
            await conexao.execute(sql)
            await global.poolConexoes.releaseConnection(conexao)
            console.log('tabela cadidato criada ou ja existente')
        } catch (error) {
            console.log(error)
        }

    }

    async gravar(candidato) {
        if (candidato instanceof Candidato) {
            const conexao = await conectar()
            const sql = `INSERT INTO candidatos (can_nome, can_partido, can_num) VALUES (?, ?, ?);`
            const parametro = [
                candidato.nome,
                candidato.partido,
                candidato.num
            ]
            await conexao.execute(sql, parametro)
            await global.poolConexoes.releaseConnection(conexao)
        }
    }
    async alterar(candidato) { 
        if (candidato instanceof Candidato) {
            const conexao = await conectar()
            const sql = `UPDATE candidatos SET
            can_num = ?,
            can_partido = ?,
            WHERE can_nome = ?; 
            `
            const parametro = [
                 candidato.nome,
                 candidato.partido,
                 candidato.num
            ]
            await conexao.execute(sql, parametro)
            await global.poolConexoes.releaseConnection(conexao)
        }
    }
    async excluir(candidato) { 
        if (candidato instanceof Candidato) {
            const conexao = await conectar()
            const sql = `DELETE FROM candidatos WHERE can_nome = ?;`
            const parametro = [
                candidato.nome
            ]

            await conexao.execute(sql, parametro)
            await global.poolConexoes.releaseConnection(conexao)

        }        
    }

    async consultar(termo) {
        let sql = ""
        let parametro = []
        if(termo){
            sql = `SELECT * FROM candidatos WHERE can_nome = ?;`;
            parametro.push(termo)
        }
        else{
            sql = `SELECT * FROM candidatos`
        }
        
        const conexao = await conectar()
        const [regs] = await conexao.execute(sql, parametro)
        let lista = []
        if(regs.length > 0){
            for (const reg of regs) {
                const candidato = new Candidato(
                    reg.can_nome, 
                    reg.can_partido, 
                    reg.can_num
                )
                lista.push(candidato)
            }
            await global.poolConexoes.releaseConnection(conexao)
            return lista
        }
        else{
            lista.push("nenhum candidato encontrado")
            await global.poolConexoes.releaseConnection(conexao)
            return lista
        }
    }
}
import Partido from "../models/Partido.js";
import conectar from './Conexao.js'


export default class CandidatoDAO {
    
    constructor() {
        this.init()
    }

    async init() {
        try{
            const conexao = await conectar()
            const sql = `CREATE TABLE IF NOT EXISTS partidos (
            p_nome VARCHAR(50) not null, 
            p_sigla VARCHAR(8), 
            p_num VARCHAR(8),
            constraint pk_candidato PRIMARY KEY (p_nome));`
            await conexao.execute(sql)
            await global.poolConexoes.releaseConnection(conexao)
            console.log('tabela partidos criada ou ja existente')
        } catch (error) {
            console.log(error)
        }

    }

    async gravar(partido) {
        if (partido instanceof Partido) {
            const conexao = await conectar()
            const sql = `INSERT INTO partidos (p_nome, p_sigla, p_num) VALUES (?, ?, ?);`
            const parametro = [
                partido.nome,
                partido.sigla,
                partido.num
            ]
            await conexao.execute(sql, parametro)
            await global.poolConexoes.releaseConnection(conexao)
        }
    }
    async alterar(partido) { 
        if (partido instanceof Partido) {
            const conexao = await conectar()
            const sql = `UPDATE partidos SET
            p_num = ?,
            p_sigla = ?
            WHERE p_nome = ?; 
            `
            const parametro = [
                partido.num,
                partido.sigla,
                partido.nome
            ]
            await conexao.execute(sql, parametro)
            await global.poolConexoes.releaseConnection(conexao)
        }
    }
    async excluir(partido) { 
        if (partido instanceof Partido) {
            const conexao = await conectar()
            const sql = `DELETE FROM partidos WHERE p_nome = ?;`
            const parametro = [
                partido.nome
            ]

            await conexao.execute(sql, parametro)
            await global.poolConexoes.releaseConnection(conexao)

        }        
    }

    async consultar(termo) {

        let sql = ``
        let parametro = []
        if(termo){
            sql = `SELECT * FROM partidos WHERE p_nome = ?;`
            parametro.push(termo)
        }
        else{
            sql = `SELECT * FROM partidos`
        }

        const conexao = await conectar()
        const [regs] = await conexao.execute(sql, parametro)
        let lista = []
        if(regs.length > 0){
            for (const reg of regs) {
                const partido = new Partido(
                    reg.p_num,
                    reg.p_nome,
                    reg.p_sigla 
                )
                lista.push(partido)
            }
            await global.poolConexoes.releaseConnection(conexao)
            return lista
        }
        else{
            lista.push("nenhum partido encontrado")
            await global.poolConexoes.releaseConnection(conexao)
            return lista
        }
    }
}
import CandidatoDAO from "../DAO/CandidatoDAO.js"

export default class Candidato {
    #nome
    #partido
    #num
    constructor(num, nome, partido) {
        this.#nome = nome
        this.#partido = partido
        this.#num = num
    }
    get nome() { return this.#nome }
    set nome(value) { this.#nome = value }

    get partido() { return this.#partido }
    set partido(value) { this.#partido = value }

    get num() { return this.#num }
    set num(value) { this.#num = value }

    async incluir() {
        const canDAO = new CandidatoDAO()
        await canDAO.gravar(this)
    }
    async alterar() {
        const canDAO = new CandidatoDAO()
        await canDAO.alterar(this)
    }
    async excluir() {
        const canDAO = new CandidatoDAO()
        await canDAO.excluir(this)
    }
    async consultar(parametro) {
        const canDAO = new CandidatoDAO()
        return await canDAO.consultar(parametro)
    }

    toJSON() {
        return {
            nome: this.#nome,
            partido: this.#partido,
            num: this.#num
        }
    }

    toString() { return `
        nome: ${this.#nome}
        partido: ${this.#partido}
        num: ${this.#num}
        ` }

}
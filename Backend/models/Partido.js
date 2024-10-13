import PartidoDAO from "../DAO/PartidoDAO.js"

export default class Partido {
    #num
    #nome
    #sigla

    constructor(num, nome, sigla) {
        this.#nome = nome
        this.#sigla = sigla
        this.#num = num
    }

    get num() { return this.#num }
    set num(val) { this.#num = val }

    get nome() { return this.#nome }
    set nome(val) { this.#nome = val }

    get sigla() { return this.#sigla }
    set sigla(val) { this.#sigla = val }

    async incluir() {
        const pDAO = new PartidoDAO()
        await pDAO.gravar(this)
    }
    async alterar() {
        const pDAO = new PartidoDAO()
        await pDAO.alterar(this)
    }
    async excluir() {
        const pDAO = new PartidoDAO()
        await pDAO.excluir(this)
    }
    async consultar(parametro) {
        const pDAO = new PartidoDAO()
        return await pDAO.consultar(parametro)
    }

    toString() {
        return `
        nome: ${this.#nome}
        sigla: ${this.#sigla}
        num: ${this.#num}
        `
    }
}
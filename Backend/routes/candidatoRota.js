import { Router } from "express";
import CandidatoCTRL from "../controller/CandidatoCTRL.js";

const rotaCandidato = Router();
const canCtrl = new CandidatoCTRL();

rotaCandidato.get("/",canCtrl.consultar)
.get("/:termo", canCtrl.consultar)
.post("/", canCtrl.gravar).put("/", canCtrl.alterar)
.delete("/",canCtrl.excluir).patch("/", canCtrl.alterar);

export default rotaCandidato
import { Router } from "express";
import PartidoCTRL from "../controller/PartidoCTRL.js";

const rotaPartido = Router();
const pCtrl = new PartidoCTRL();

rotaPartido.get("/",canCtrl.consultar)
.get("/:termo", canCtrl.consultar)
.post("/", canCtrl.gravar).put("/", canCtrl.alterar)
.delete("/",canCtrl.excluir).patch("/", canCtrl.alterar);

export default rotaPartido
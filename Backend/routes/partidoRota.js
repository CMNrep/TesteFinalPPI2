import { Router } from "express";
import PartidoCTRL from "../controller/PartidoCTRL.js";

const rotaPartido = Router();
const pCtrl = new PartidoCTRL();

rotaPartido.get("/",pCtrl.consultar)
.get("/:termo", pCtrl.consultar)
.post("/", pCtrl.gravar).put("/", pCtrl.alterar)
.delete("/",pCtrl.excluir).patch("/", pCtrl.alterar);

export default rotaPartido
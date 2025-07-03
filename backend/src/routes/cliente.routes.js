import {Router} from "express";
import {authRequired, planRequired} from "../middlewares/validateToken.js";
import {createCliente, getClienteByRut, getClienteName} from "../controllers/cliente.controller.js";

const router = Router();

router.get("/getclientname/:cliente_rut", authRequired, planRequired, getClienteName);
router.get("/getclientbyrut/:cliente_rut", authRequired, planRequired, getClienteByRut);
router.post("/createcliente", authRequired, planRequired, createCliente);

export default router;
import { Router } from "express";
import { authRequired, planRequired } from "../middlewares/validateToken.js";
import { getClienteName } from "../controllers/cliente.controller.js";

const router = Router();

router.get("/getclientname/:cliente_rut", authRequired, planRequired, getClienteName);

export default router;
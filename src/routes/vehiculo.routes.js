import { Router } from "express";
import { authRequired, planRequired } from "../middlewares/validateToken.js";
import { getVehiculoName } from "../controllers/vehiculo.controller.js";

const router = Router();

router.get("/getvehiculoname/:patente", authRequired, planRequired, getVehiculoName);

export default router;
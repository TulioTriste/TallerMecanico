import {Router} from "express";
import {authRequired, planRequired} from "../middlewares/validateToken.js";
import {getVehiculoByPatente, getVehiculoName} from "../controllers/vehiculo.controller.js";

const router = Router();

router.get("/getvehiculoname/:patente", authRequired, planRequired, getVehiculoName);

router.get("/getvehiculo/:patente", authRequired, planRequired, getVehiculoByPatente);

export default router;
import { Router } from "express";
import { authRequired, ownTallerRequired } from "../middlewares/validateToken.js";
import { getCountRegisteredVehicles, getNextCita, getOrdenesDeTrabajoCount, getOrdenesDeTrabajoCountByEstado,
    getCountCitasProx7Dias,
    getRecentOTs,
    getCountOTMes,
    getIngresosDelMes,
    getCitasHoy,
    getRoles
 } from "../controllers/controlpanel.controller.js";

const router = Router();

router.get("/registeredvehicles", authRequired, getCountRegisteredVehicles);
router.get("/nextcita/:taller_id", authRequired, ownTallerRequired, getNextCita);
router.get("/ordenestrabajocount/:taller_id", authRequired, getOrdenesDeTrabajoCount);
router.get("/ordenestrabajocountestado/:taller_id/:estado_id", authRequired, getOrdenesDeTrabajoCountByEstado);
router.get("/citasprox7dias/:taller_id", authRequired, ownTallerRequired, getCountCitasProx7Dias);
router.get("/otdelmes/:taller_id", authRequired, ownTallerRequired, getCountOTMes);
router.get("/otsrecientes/:taller_id/:days", authRequired, ownTallerRequired, getRecentOTs);
router.get("/citashoy/:taller_id", authRequired, ownTallerRequired, getCitasHoy);
router.get("/ingresosdelmes/:taller_id", authRequired, ownTallerRequired, getIngresosDelMes);
router.get("/getroles", authRequired, getRoles)

export default router;
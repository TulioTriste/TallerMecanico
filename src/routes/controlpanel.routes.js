import { Router } from "express";
import { authRequired, ownTallerRequired } from "../middlewares/validateToken.js";
import { getCountRegisteredVehicles, getNextCita } from "../controllers/controlpanel.controller.js";

const router = Router();

router.get("/registeredvehicles", authRequired, getCountRegisteredVehicles);
router.get("/nextcita/:id", authRequired, ownTallerRequired, getNextCita);

export default router;
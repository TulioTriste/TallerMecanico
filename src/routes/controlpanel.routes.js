import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { getCountRegisteredVehicles } from "../controllers/controlpanel.controller.js";

const router = Router();

router.get("/registeredvehicles", authRequired, getCountRegisteredVehicles);

export default router;
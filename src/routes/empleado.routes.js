import { Router } from "express";
import { authRequired, ownTallerRequired, planRequired } from "../middlewares/validateToken.js";
import { getEmpleadosByTaller, insertEmpleado } from "../controllers/empleado.controller.js";

const router = Router();

router.post("/add", authRequired, planRequired, insertEmpleado);
router.get("/get/:taller_id", authRequired, planRequired, ownTallerRequired, getEmpleadosByTaller);

export default router;
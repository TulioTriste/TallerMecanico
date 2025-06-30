import {Router} from "express";
import {authRequired, ownTallerRequired, planRequired} from "../middlewares/validateToken.js";
import {
  deleteEmpleado,
  getEmpleadosByTaller,
  insertEmpleado,
  isEmpleadoExists, loginEmpleado
} from "../controllers/empleado.controller.js";

const router = Router();

router.post("/add", authRequired, planRequired, insertEmpleado);
router.get("/get/:taller_id", authRequired, planRequired, ownTallerRequired, getEmpleadosByTaller);
router.delete("/delete", authRequired, planRequired, deleteEmpleado);
router.get("/exists", authRequired, planRequired, isEmpleadoExists);
router.post("/login", loginEmpleado);

export default router;
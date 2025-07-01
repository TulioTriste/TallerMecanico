import {Router} from "express";
import {authRequired, ownTallerRequired, planRequired} from "../middlewares/validateToken.js";
import {
  addCita, getCitasByTaller,
  getCitasHoy, getCitasHoyTotalCount, getClientesCount,
  getCountCitasProx7Dias,
  getCountOTMes,
  getCountRegisteredVehicles, getEstados,
  getIngresosDelMes,
  getNextCita, getOrdenesActivasCount,
  getOrdenesDeTrabajoCount,
  getOrdenesDeTrabajoCountByEstado,
  getRecentOTs,
  getRoles
} from "../controllers/controlpanel.controller.js";
import {
  addOt,
  addTaskToOt,
  getOt, getOtByUniqueId, getOtsByTallerId,
  getTasksByOtId,
  updateOrCreateTasks,
  updateOt,
  uploadImages
} from "../controllers/ot.controller.js";
import multer from "multer";
import * as path from "node:path";

const router = Router();

router.get("/registeredvehicles", getCountRegisteredVehicles);
router.get("/ordenesactivas", getOrdenesActivasCount);
router.get("/clientescount", getClientesCount);
router.get("/citashoytotal", getCitasHoyTotalCount);
router.get("/nextcita/:taller_id", authRequired, ownTallerRequired, getNextCita);
router.get("/ordenestrabajocount/:taller_id", authRequired, getOrdenesDeTrabajoCount);
router.get("/ordenestrabajocountestado/:taller_id/:estado_id", authRequired, getOrdenesDeTrabajoCountByEstado);
router.get("/citasprox7dias/:taller_id", authRequired, ownTallerRequired, getCountCitasProx7Dias);
router.get("/otdelmes/:taller_id", authRequired, ownTallerRequired, getCountOTMes);
router.get("/otsrecientes/:taller_id/:days", authRequired, ownTallerRequired, getRecentOTs);
router.get("/citashoy/:taller_id", authRequired, ownTallerRequired, getCitasHoy);
router.get("/ingresosdelmes/:taller_id", authRequired, ownTallerRequired, getIngresosDelMes);
router.get("/getroles", getRoles);
router.get("/getot/:taller_id/:ot_id", authRequired, ownTallerRequired, getOt);
router.post("/addtasktoot/:taller_id/:ot_id", authRequired, ownTallerRequired, addTaskToOt);
router.get("/gettasksbyotid/:taller_id/:ot_id", authRequired, ownTallerRequired, getTasksByOtId);
router.post("/updorcretasks/:taller_id/:ot_id", authRequired, ownTallerRequired, updateOrCreateTasks);
router.get("/getestados", getEstados);
router.post("/updateot/:taller_id/:ot_id", authRequired, ownTallerRequired, updateOt);
router.post("/addot/:taller_id", authRequired, planRequired, ownTallerRequired, addOt);
router.get("/getotbyuniqueid/:uniqueId", getOtByUniqueId);
router.post("/addcita/:taller_id", authRequired, ownTallerRequired, addCita);
router.get("/getcitas/:taller_id", authRequired, ownTallerRequired, getCitasByTaller);
router.get("/getots/:taller_id", authRequired, ownTallerRequired, getOtsByTallerId);

const storage = multer.diskStorage({
  destination: '../uploads/',
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });
router.post("/uploadimage", upload.array('files', 10), uploadImages);

export default router;
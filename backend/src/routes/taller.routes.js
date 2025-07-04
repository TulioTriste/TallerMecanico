import {Router} from "express";
import {authRequired, canByUserType, canAddTallerByPlan, planRequired, ownTallerRequired} from "../middlewares/validateToken.js";
import {addTaller, updateTaller, deleteTaller} from "../controllers/taller.controller.js";

const router = Router();

router.post("/add", authRequired, planRequired, canAddTallerByPlan, canByUserType, addTaller)
router.put("/update/:taller_id", authRequired, ownTallerRequired, updateTaller);
router.post("/delete", authRequired, planRequired, canByUserType, deleteTaller);

export default router;
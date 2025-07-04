import {Router} from "express";
import {authRequired, canByUserType, canAddTallerByPlan, planRequired, ownTallerRequired} from "../middlewares/validateToken.js";
import {addTaller, updateTaller} from "../controllers/taller.controller.js";

const router = Router();

router.post("/add", authRequired, planRequired, canAddTallerByPlan, canByUserType, addTaller)
router.put("/update/:taller_id", authRequired, ownTallerRequired, updateTaller);

export default router;
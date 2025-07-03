import {Router} from "express";
import {authRequired, canByUserType, canAddTallerByPlan, planRequired} from "../middlewares/validateToken.js";
import {addTaller, deleteTaller} from "../controllers/taller.controller.js";

const router = Router();

router.post("/add", authRequired, planRequired, canAddTallerByPlan, canByUserType, addTaller);
router.post("/delete", authRequired, planRequired, canByUserType, deleteTaller);

export default router;
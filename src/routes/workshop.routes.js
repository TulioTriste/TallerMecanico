import {Router} from "express";
import {authRequired, ownTallerRequired} from "../middlewares/validateToken.js";
import {getTaller, getWorkshops} from "../controllers/workshop.controller.js";

const router = Router();

router.get("/workshops", authRequired, getWorkshops);
router.get("/workshop/dashboard/:taller_id", authRequired, ownTallerRequired, getTaller);

export default router;
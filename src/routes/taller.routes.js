import {Router} from "express";
import {authRequired, planRequired} from "../middlewares/validateToken.js";
import {addTaller} from "../controllers/taller.controller.js";

const router = Router();

router.post("/add", authRequired, planRequired, addTaller)

export default router;
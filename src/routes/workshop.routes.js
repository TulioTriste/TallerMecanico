import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { getWorkshop } from "../controllers/workshop.controller.js";

const router = Router();

router.get("/workshops", authRequired, getWorkshop);

export default router;
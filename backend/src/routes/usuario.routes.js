import {Router} from "express";
import {authRequired} from "../middlewares/validateToken.js";
import {updateProfileUser} from "../controllers/usuario.controller.js";

const router = Router();

router.put("/update", authRequired, updateProfileUser);

export default router;
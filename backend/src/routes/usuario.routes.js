import {Router} from "express";
import {authRequired} from "../middlewares/validateToken.js";
import {getCurrentPasswordCorrect, updatePassword, updateProfileUser} from "../controllers/usuario.controller.js";

const router = Router();

router.put("/update", authRequired, updateProfileUser);
router.post("/correctpassword", authRequired, getCurrentPasswordCorrect);
router.post("/updatepassword", authRequired, updatePassword);

export default router;
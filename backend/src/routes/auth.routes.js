import {Router} from "express";
import {
  getRutByCorreo,
  isValidMail,
  login,
  logout,
  register,
  requestResetPassword,
  resetPassword,
  verifyToken
} from "../controllers/auth.controller.js";
import {validateSchema} from "../middlewares/validator.middleware.js";
import {loginSchema, registerSchema} from "../schemas/auth.schema.js";

const router = Router();

router.post("/register", validateSchema(registerSchema), register);
router.post("/login", validateSchema(loginSchema), login);
router.post("/logout", logout);
router.get("/verify", verifyToken);
router.post("/valid-email", isValidMail)
router.post("/request-reset-password", requestResetPassword);
router.get("/getrut-bycorreo", getRutByCorreo);
router.post("/reset-password", resetPassword);

export default router;
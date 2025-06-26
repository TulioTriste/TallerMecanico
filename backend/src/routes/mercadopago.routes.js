import { Router } from "express";
import { createPreference, getPaymentById, receiveWebhook } from "../controllers/mercadopago.controller.js";
import {authRequired} from "../middlewares/validateToken.js";

const router = Router();

router.post("/create-preference", authRequired, createPreference);
router.get("/payments/:id", authRequired, getPaymentById);
router.post("/webhook", authRequired, receiveWebhook);

export default router;
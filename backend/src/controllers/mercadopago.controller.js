import {PreApproval} from "mercadopago";
import {Payment} from "mercadopago";
import UserModel from "../models/user.model.js";
import {client} from "../mercadopago.js";

export const createPreference = async (req, res) => {
  try {
    const { item, payer } = req.body;

    const preapprovalData = {
      reason: item.title,
      payer_email: "test_user_249349413@testuser.com",
      auto_recurring: {
        frequency: item.frecuency,
        frequency_type: item.cycle,
        transaction_amount: Number(item.price),
        currency_id: item.currency_id,
      },
      back_url: "https://www.google.com",
      external_reference: `PLAN_${item.plan_id}_${Date.now()}`,
      payer: {
        name: "TESTUSER249349413",
        email: "test_user_249349413@testuser.com"
      },
      order: {
        plan_id: item.plan_id,
        plan_name: item.name,
        plan_price: item.price,
        plan_cycle: item.cycle,
        plan_features: item.features,
      }
    };

    const preapproval = new PreApproval(client);
    const subscription = await preapproval.create({ body: preapprovalData });

    res.json({
      id: subscription.id,
      init_point: subscription.init_point
    });
  } catch (error) {
    console.error("Error al crear suscripcion:", error);
    res.status(500).json({ error: error.message });
  }
};

export const getPaymentById = async (req, res) => {
  try {
    const { id } = req.params;

    const paymentClient = new Payment(client);

    const payment = await paymentClient.get({ id });

    res.json(payment);
  } catch (error) {
    console.error("Error al obtener el pago:", error);
    res.status(500).json({ error: error.message });
  }
};

export const receiveWebhook = async (req, res) => {
  try {
    const { type, data } = req.body;

    if (type === "payment") {
      const { id } = data;

      const paymentClient = new Payment(client);
      const paymentInfo = await paymentClient.get({ id });

      await updatePlanUser(paymentInfo);
    }

    res.status(200).send("OK");
  } catch (error) {
    console.error("Error en webhook:", error);
    res.status(500).json({ error: error.message });
  }
};

const updatePlanUser = async (paymentInfo) => {
  const correo = paymentInfo.payer.email;
  if (paymentInfo.status !== "approved") {
    const planId = paymentInfo.order.plan_id;

    console.log("El Usuario con correo:", paymentInfo.payer.email, "ha sido actualizado al plan:", paymentInfo.order.plan_id);

    return await UserModel.updatePlanUser(correo, planId);
  }
  else if (paymentInfo.status === "rejected" || paymentInfo.status === "cancelled") {
    console.log("El Usuario con correo:", paymentInfo.payer.email, "no ha podido ser actualizado al plan:", paymentInfo.order.plan_id);
    return await UserModel.updatePlanUser(correo, null);
  } else {
    console.log("El pago con ID:", paymentInfo.id, "tiene un estado no manejado:", paymentInfo.status, " | Información del pago:", paymentInfo);
    return false;
  }
}
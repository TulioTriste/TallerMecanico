import {MercadoPagoConfig, PreApproval, Preference} from "mercadopago";
import dotenv from "dotenv";
const {Payment} = await import("mercadopago");

dotenv.config();

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN ||
    "TEST-4961014534120242-062416-fbf59ae19bf1eaf95ac01305faff6f26-2511954735",
  options: { timeout: 5000 },
});

const preferenceClient = new Preference(client);

export const createPreference = async (req, res) => {
  try {
    const { item, payer } = req.body;

    // Crear la preferencia de pago
    const preapprovalData = {
      reason: item.title,
      payer_email: payer.email,
      auto_recurring: {
        frequency: item.frecuency,
        frequency_type: item.cycle,
        transaction_amount: Number(item.price),
        currency_id: item.currency_id,
      },
      back_url: "https://www.google.com",
      external_reference: `PLAN_${item.plan_id}_${Date.now()}`,
      payer: {
        name: payer.name,
        surname: payer.surname,
        email: payer.email
      }
    };

    console.log(preapprovalData);

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

      // Aquí puedes actualizar el estado del pago en tu base de datos
      console.log(`Recibida notificación de pago con ID: ${id}`);

      // También puedes obtener los detalles del pago
      const { Payment } = await import("mercadopago");
      const paymentClient = new Payment(client);
      const paymentInfo = await paymentClient.get({ id });

      // Actualiza el estado de la orden en tu sistema
      // await updateOrderStatus(paymentInfo);
    }

    res.status(200).send("OK");
  } catch (error) {
    console.error("Error en webhook:", error);
    res.status(500).json({ error: error.message });
  }
};
import { MercadoPagoConfig, Preference } from "mercadopago";
import dotenv from "dotenv";

dotenv.config();

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN ||
    "TEST-4961014534120242-062416-fbf59ae19bf1eaf95ac01305faff6f26-2511954735",
  options: { timeout: 5000 },
});

const preferenceClient = new Preference(client);

export const createPreference = async (req, res) => {
  try {
    const { items, payer } = req.body;

    console.log("payer:", payer);

    // Crear la preferencia de pago
    const preferenceData = {
      items: items.map(item => ({
        title: item.title,
        quantity: item.quantity || 1,
        unit_price: item.price,
        currency_id: "CLP",
        description: item.description || item.title,
        plan_id: item.plan_id,
      })),
      back_urls: {
        success: `${process.env.FRONTEND_URL || "http://localhost:5173"}/success`,
        failure: `${process.env.FRONTEND_URL || "http://localhost:5173"}/failure`,
        pending: `${process.env.FRONTEND_URL || "http://localhost:5173"}/pending`,
      },
      notification_url: `${process.env.FRONTEND_URL || "http://localhost:5173"}/webhook`,
      binary_mode: true,
      payer: payer,
    };

    const preference = await preferenceClient.create({ body: preferenceData });

    res.json({
      id: preference.id,
      init_point: preference.init_point
    });
  } catch (error) {
    console.error("Error al crear preferencia:", error);
    res.status(500).json({ error: error.message });
  }
};

export const getPaymentById = async (req, res) => {
  try {
    const { id } = req.params;

    const { Payment } = await import("mercadopago");
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
import axios from "./axios.js";

export const createPreferenceRequest = async (data) => axios.post("/mercadopago/create-preference", data);

export const getPaymentStatusRequest = async (data) => axios.get(`/mercadopago/payments/${data.payment_id}`);

export const receiveWebhookRequest = async (data) => axios.post("/mercadopago/webhook", data);
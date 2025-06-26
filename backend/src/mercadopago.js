import { MercadoPagoConfig } from "mercadopago";

export const client = new MercadoPagoConfig({
  accessToken: "TEST-4961014534120242-062416-fbf59ae19bf1eaf95ac01305faff6f26-2511954735",
  options: { timeout: 5000 },
});
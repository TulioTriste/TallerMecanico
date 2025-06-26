import express from 'express';
import morgan from 'morgan'
import cookieParser from 'cookie-parser';
import cors from 'cors';

import authRoutes from './routes/auth.routes.js';
import workshopRoutes from './routes/workshop.routes.js';
import controlpanelRoutes from './routes/controlpanel.routes.js';
import clienteRoutes from './routes/cliente.routes.js';
import vehiculoRoutes from './routes/vehiculo.routes.js';
import empleadoRoutes from './routes/empleado.routes.js';
import {FRONTEND_URL} from "./config.js";
import tallerRoutes from "./routes/taller.routes.js";
import mercadopagoRoutes from "./routes/mercadopago.routes.js";

const app = express();

app.use(
  cors({
    credentials: true,
    origin: FRONTEND_URL,
  })
);
// La configuracion 'dev' es para ver todas las peticiones en la consola (https://www.npmjs.com/package/morgan)
app.use(morgan('dev'));
app.use(express.json()); // Para poder recibir datos en formato JSON
app.use(cookieParser()); // Para poder leer las cookies de las peticiones

app.use("/api/uploads", express.static("uploads")); // Para servir archivos estáticos desde la carpeta 'uploads'

app.use("/api/auth", authRoutes);
app.use("/api", workshopRoutes);
app.use("/api/cp", controlpanelRoutes);
app.use("/api/cliente", clienteRoutes);
app.use("/api/veh", vehiculoRoutes);
app.use("/api/empleados", empleadoRoutes);
app.use("/api/taller", tallerRoutes);
app.use("/api/mercadopago", mercadopagoRoutes);

export default app;
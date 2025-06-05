import express from 'express';
import morgan from 'morgan'
import cookieParser from 'cookie-parser';
import cors from 'cors';

import authRoutes from './routes/auth.routes.js';
import workshopRoutes from './routes/workshop.routes.js';
import controlpanelRoutes from './routes/controlpanel.routes.js';
import clienteRoutes from './routes/cliente.routes.js';
import vehiculoRouter from './routes/vehiculo.routes.js';
import { FRONTEND_URL } from "./config.js";

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
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api", workshopRoutes);
app.use("/api/cp", controlpanelRoutes);
app.use("/api/cliente", clienteRoutes);
app.use("/api/veh", vehiculoRouter);

export default app;
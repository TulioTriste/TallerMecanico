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
import * as path from "node:path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import usuarioRoutes from "./routes/usuario.routes.js";


const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));
/*app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});*/

app.use(
  cors({
    credentials: true,
    origin: FRONTEND_URL,
  })
);
// La configuracion 'dev' es para ver todas las peticiones en la consola (https://www.npmjs.com/package/morgan)
app.use(morgan('dev'));
app.use(express.json()); // Para poder recibir datos en formato JSON
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // Para poder leer las cookies de las peticiones

app.use(
  "/api/uploads",
  express.static(path.join(__dirname, '../../uploads'))
);

app.use("/api/auth", authRoutes);
app.use("/api", workshopRoutes);
app.use("/api/cp", controlpanelRoutes);
app.use("/api/cliente", clienteRoutes);
app.use("/api/veh", vehiculoRoutes);
app.use("/api/empleados", empleadoRoutes);
app.use("/api/taller", tallerRoutes);
app.use("/api/mercadopago", mercadopagoRoutes);
app.use("/api/user", usuarioRoutes);

export default app;
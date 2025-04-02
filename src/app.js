import express from 'express';
import morgan from 'morgan'

import authRoutes from './routes/auth.routes.js';

const app = express();

// La configuracion 'dev' es para ver todas las peticiones en la consola (https://www.npmjs.com/package/morgan)
app.use(morgan('dev'));  
app.use(express.json()); // Para poder recibir datos en formato JSON

app.use("/api", authRoutes);

export default app;
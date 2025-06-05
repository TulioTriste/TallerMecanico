import jwt from 'jsonwebtoken';
import { TOKEN_KEY_SECRET } from '../config.js';
import tallerModel from "../models/taller.model.js";
import userModel from '../models/user.model.js';

export const authRequired = (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        console.log('No token provided');
        return res.status(401).json({ message: 'Unauthorizedb' });
    }

    jwt.verify(token, TOKEN_KEY_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorizeda' });
        }

        req.user = decoded;

        next();
    });
}

export const ownTallerRequired = async (req, res, next) => {
    try {
        const rutUsuario = req.user.rut;
        const tallerId = req.params.taller_id;

        const taller = await tallerModel.getTallerById(tallerId);

        if (!taller) {
            return res.status(404).json({ message: 'Taller no encontrado' });
        }

        if (taller.usuario_rut !== rutUsuario) {
            return res.status(403).json({ message: 'No autorizado para acceder a este taller' });
        }

        next();
    } catch (error) {
        console.error('Error en ownTallerRequired:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}

export const planRequired = (req, res, next) => {
    const rut = req.user.rut;

    const hasPlan = userModel.hasPlanUser(rut);

    if (!hasPlan) {
        return res.status(403).json({ message: 'Plan requerido para acceder a esta funcionalidad' });
    }

    next();
}
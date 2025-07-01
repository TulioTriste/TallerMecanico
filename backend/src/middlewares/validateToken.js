import jwt from 'jsonwebtoken';
import {TOKEN_KEY_SECRET} from '../config.js';
import tallerModel from "../models/taller.model.js";
import userModel from '../models/user.model.js';
import EmpleadoModel from "../models/empleado.model.js";

export const authRequired = (req, res, next) => {
  const {token} = req.cookies;

  if (!token) {
    return res.status(401).json({message: 'Unauthorized No Token'});
  }

  jwt.verify(token, TOKEN_KEY_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({message: 'Unauthorized Token Error'});
    }

    req.user = decoded;

    next();
  });
}

export const ownTallerRequired = async (req, res, next) => {
  try {
    const rut = req.user.rut;
    const tallerId = req.params.taller_id;

    const taller = await tallerModel.getTallerById(tallerId);
    if (!taller) {
      return res.status(404).json({ message: 'Taller no encontrado' });
    }

    const tipo = req.user.tipo;

    if (tipo === 'empleado' || tipo === 'practicante') {
      const empleado = await EmpleadoModel.getByRut(rut);
      if (!empleado) {
        return res.status(404).json({ message: 'Empleado no encontrado' });
      }
      const tallerEmpleado = await EmpleadoModel.getTallerByRut(empleado.empleado_rut);
      if (!tallerEmpleado || tallerEmpleado.taller_id !== taller.taller_id) {
        return res.status(403).json({ message: 'No autorizado para acceder a este taller' });
      }

      return next();
    }

    if (tipo === 'administrador' || tipo === 'usuario') {
      if (taller.usuario_rut !== rut) {
        return res.status(403).json({ message: 'No autorizado para acceder a este taller' });
      }
      return next();
    }

    return res.status(403).json({ message: 'No autorizado para acceder a esta funcionalidad' });
  } catch (error) {
    console.error('Error en ownTallerRequired:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
}

export const planRequired = (req, res, next) => {
  const rut = req.user.rut;

  const hasPlan = userModel.hasPlanUser(rut);

  if (!hasPlan) {
    return res.status(403).json({message: 'Plan requerido para acceder a esta funcionalidad'});
  }

  next();
}

export const canAddTallerByPlan = (req, res, next) => {
  const rut = req.user.rut;

  const canAdd = userModel.canCreateTaller(rut);

  if (!canAdd) {
    return res.status(403).json({message: 'No puedes agregar más elementos con tu plan actual'});
  }

  next();
}

export const canByUserType = (req, res, next) => {
  const userType = req.user.tipo;

  if (userType === 'empleado') {
    return res.status(403).json({message: 'No puedes agregar elementos como empleado'});
  }

  next();
}
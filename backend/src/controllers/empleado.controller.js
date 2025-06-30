import empleadoModel from "../models/empleado.model.js";
import bcrypt from "bcryptjs";
import EmpleadoModel from "../models/empleado.model.js";

export const insertEmpleado = async (req, res) => {
  const {empleado_rut, taller_id, roles_id, nombre, apellido, telefono, correo, password} = req.body;

  const passwordHash = await bcrypt.hash(password, 10);

  try {
    const data = {
      empleado_rut,
      taller_id,
      roles_id,
      nombre,
      apellido,
      telefono,
      correo,
      password: passwordHash
    };

    const result = await empleadoModel.insertEmpleado(data);

    if (result) {
      return res.status(200).json({
        message: "Empleado registrado exitosamente",
        empleado: data
      });
    } else {
      return res.status(400).json({
        message: "Error al registrar el empleado"
      });
    }
  } catch (error) {
    console.error("Error al insertar empleado:", error);
    return res.status(500).json({
      message: "Error interno del servidor",
      error: error.message
    });
  }
};

export const getEmpleadosByTaller = async (req, res) => {
  const {taller_id} = req.params;

  try {
    const empleados = await empleadoModel.getEmpleadosByTaller(taller_id);

    if (empleados.length === 0) {
      return res.status(404).json({
        message: "No se encontraron empleados para este taller"
      });
    }

    return res.json(empleados);
  } catch (error) {
    console.error("Error al obtener empleados:", error);
    return res.status(500).json({
      message: "Error interno del servidor",
      error: error.message
    });
  }
};

export const deleteEmpleado = async (req, res) => {
  const {empleado_rut} = req.body;

  try {
    const result = await empleadoModel.deleteEmpleado(empleado_rut);

    if (result) {
      return res.status(200).json({
        message: "Empleado eliminado exitosamente"
      });
    } else {
      return res.status(404).json({
        message: "Empleado no encontrado"
      });
    }
  } catch (error) {
    console.error("Error al eliminar empleado:", error);
    return res.status(500).json({
      message: "Error interno del servidor",
      error: error.message
    });
  }
};

export const isEmpleadoExists = async (req, res) => {
  const {empleado_rut} = req.body;
  console.log(req.body);

  try {
    const empleado = await EmpleadoModel.isEmpleadoExist(empleado_rut);

    if (empleado) {
      return res.status(200).json({
        exists: true,
        empleado
      });
    } else {
      return res.status(404).json({
        exists: false,
        message: "Empleado no encontrado"
      });
    }
  } catch (error) {
    console.error("Error al verificar existencia de empleado:", error);
    return res.status(500).json({
      message: "Error interno del servidor",
      error: error.message
    });
  }
};
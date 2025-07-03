import TallerModel from "../models/taller.model.js";
import UserModel from "../models/user.model.js";

export const addTaller = async (req, res) => {
  const { usuario_rut, nombre, telefono, correo, direccion, inicio_jornada, termino_jornada } = req.body;

  try {
    const canCreate = await UserModel.canCreateTaller(usuario_rut);

    if (!canCreate) {
      return res.status(403).json({
        message: "Has alcanzado el límite de talleres permitido por tu plan",
        status: "error"
      });
    }

    const modelResponse = await TallerModel
      .addTaller(usuario_rut, nombre, telefono, correo, direccion, inicio_jornada, termino_jornada);

    if (!modelResponse) {
      return res.status(400).json({
        message: "Error al agregar el taller.",
      });
    }
    return res.status(201).json({
      message: "Taller agregado correctamente.",
      data: {
        usuario_rut,
        nombre,
        telefono,
        correo,
        direccion,
        inicio_jornada,
        termino_jornada
      }
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error interno del servidor.",
    });
  }
};

export const deleteTaller = async (req, res) => {
  const { taller_id } = req.body;

  try {
    const response = await TallerModel.deleteTaller(taller_id);

    if (!response) {
      return res.status(400).json({
        message: "Error al eliminar el taller.",
      });
    }
    return res.status(200).json({
      message: "Taller eliminado correctamente.",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error interno del servidor.",
    });
  }
}
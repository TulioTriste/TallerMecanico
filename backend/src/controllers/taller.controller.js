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
}

export const updateTaller = async (req, res) => {
  try {
    const { taller_id } = req.params;
    const { nombre, telefono, correo, direccion, inicio_jornada, termino_jornada } = req.body;

    // Validar que el taller existe
    const tallerExistente = await TallerModel.getTallerById(taller_id);
    if (!tallerExistente) {
      return res.status(404).json({ message: "Taller no encontrado" });
    }

    // Validar que el usuario tiene permiso para editar este taller
    // Asumiendo que el usuario_rut viene del token de autenticación
    if (tallerExistente.usuario_rut !== req.user.rut) {
      return res.status(403).json({ message: "No tienes permiso para editar este taller" });
    }

    const updated = await TallerModel.updateTaller(taller_id, {
      nombre,
      telefono,
      correo,
      direccion,
      inicio_jornada,
      termino_jornada
    });

    if (updated) {
      const tallerActualizado = await TallerModel.getTallerById(taller_id);
      res.json(tallerActualizado);
    } else {
      res.status(400).json({ message: "No se pudo actualizar el taller" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
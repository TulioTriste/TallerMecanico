import UserModel from "../models/user.model.js";

export const updateProfileUser = async (req, res) => {
  const { usuario_rut, nombre, apellido, telefono } = req.body;

  try {
    const result = await UserModel.updateProfileUser(usuario_rut, nombre, apellido, telefono);
    if (result.rowsAffected[0] > 0) {
      res.status(200).json({ message: "Perfil actualizado correctamente" });
    } else {
      res.status(404).json({ message: "Usuario no encontrado" });
    }
  } catch (error) {
    console.error("Error al actualizar el perfil:", error);
    res.status(500).json({ message: "Error al actualizar el perfil" });
  }
}

export const getCurrentPassword = async (req, res) => {
  const { usuario_rut } = req.body;

  try {
    const user = await UserModel.getUserByRut(usuario_rut);
    if (user) {
      res.status(200).json({ password: user.password });
    } else {
      res.status(404).json({ message: "Usuario no encontrado" });
    }
  } catch (error) {
    console.error("Error al obtener la contraseña actual:", error);
    res.status(500).json({ message: "Error al obtener la contraseña actual" });
  }
}
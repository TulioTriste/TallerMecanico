import UserModel from "../models/user.model.js";
import bcrypt from "bcryptjs";

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

export const getCurrentPasswordCorrect = async (req, res) => {
  const { usuario_rut, password } = req.body;

  try {
    const passwordFound = await UserModel.getCurrentPassword(usuario_rut);

    if (!passwordFound) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const isMatch = await bcrypt.compare(password, passwordFound);
    return res.status(200).json({
      correct: isMatch
    });
  } catch (error) {
    console.error("Error al obtener la contraseña actual:", error);
    res.status(500).json({ message: "Error al obtener la contraseña actual" });
  }
}

export const updatePassword = async (req, res) => {
  const { usuario_rut, newPassword } = req.body;

  console.log(newPassword)

  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const result = await UserModel.updatePassword(usuario_rut, hashedPassword);

    if (result.rowsAffected[0] > 0) {
      res.status(200).json({ message: "Contraseña actualizada correctamente" });
    } else {
      res.status(404).json({ message: "Usuario no encontrado" });
    }
  } catch (error) {
    console.error("Error al actualizar la contraseña:", error);
    res.status(500).json({ message: "Error al actualizar la contraseña" });
  }
}
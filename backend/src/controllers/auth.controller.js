import UserModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import {createAccessToken} from "../libs/jwt.js";
import jwt from "jsonwebtoken";
import {TOKEN_KEY_SECRET} from "../config.js";
import {v4} from "uuid";
import PassModel from "../models/pass.model.js";
import {transporter} from "../transporter.js";

export const register = async (req, res) => {
  const {rut, nombre, apellido, correo, password, telefono, direccion} = req.body;

  const passwordHash = await bcrypt.hash(password, 10);

  var responseMessage;
  let newUser = await UserModel.addUser(rut, nombre, apellido, correo, passwordHash, telefono, direccion);

  if (!newUser) {
    return res.status(400).json({
      message: "Error intentando crear el Usuario en la BD.",
    });
  }

  responseMessage = "El Usuario ha sido creado exitosamente";

  try {
    const token = await createAccessToken({
        rut: newUser.usuario_rut,
        correo: newUser.correo,
        nombre: newUser.nombre,
        tipo: "usuario",
      },
      true);

    res.cookie("token", token);
    res.json({
      message: responseMessage,
      user: {
        rut: newUser.usuario_rut,
        nombre: newUser.nombre,
        apellido: newUser.apellido,
        correo: newUser.correo,
        telefono: newUser.telefono,
        direccion: newUser.direccion,
        empresa: newUser.empresa,
        plan_id: newUser.plan_id,
        tipo: "usuario",
      },
    });
  } catch (error) {
    console.error("Error en el registro", error);
    res.status(500).json({
      message: "Error en el registro",
      error: error.message,
    });
  }
}

export const login = async (req, res) => {
  const {correo, password, rememberMe} = req.body;

  let userFound = await UserModel.getUserByCorreo(correo);

  if (!userFound) {
    return res.status(400).json({
      message: "Este usuario no existe.",
    });
  }

  const isMatch = await bcrypt.compare(password, userFound.password);

  if (!isMatch) {
    return res.status(400).json({
      message: "Credenciales Invalidas.",
    });
  }

  try {
    const token = await createAccessToken({
        rut: userFound.usuario_rut,
        correo: userFound.correo,
        nombre: userFound.nombre,
        tipo: "usuario",
      },
      rememberMe);

    res.cookie("token", token);
    return res.status(200).json({
      message: "El Usuario ha sido encontrado exitosamente",
      token,
      user: {
        rut: userFound.usuario_rut,
        nombre: userFound.nombre,
        apellido: userFound.apellido,
        correo: userFound.correo,
        telefono: userFound.telefono,
        direccion: userFound.direccion,
        empresa: userFound.empresa,
        plan_id: userFound.plan_id,
        tipo: "usuario",
      },
    });
  } catch (error) {
    console.error("Error en el registro", error);
    return res.status(500).json({
      message: "Error en el registro",
      error: error.message,
    });
  }
}

export const logout = (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });
  return res.status(200);
}

export const verifyToken = async (req, res) => {
  const {token} = req.cookies;
  if (!token) return res.send(false);

  jwt.verify(token, TOKEN_KEY_SECRET, async (error, user) => {
    if (error) {
      return res.status(401).json({
        message: "Token no valido",
      });
    }

    const tipo = user.tipo;
    if (tipo === "empleado") {
      const empleadoFound = await UserModel.getUserByRut(user.rut);

      if (!empleadoFound) {
        return res.status(401).json({
          message: "Empleado no encontrado",
        });
      }

      return res.json({
        rut: empleadoFound.usuario_rut,
        nombre: empleadoFound.nombre,
        apellido: empleadoFound.apellido,
        correo: empleadoFound.correo,
        telefono: empleadoFound.telefono,
        direccion: empleadoFound.direccion,
        empresa: empleadoFound.empresa,
        plan_id: empleadoFound.plan_id,
        tipo: tipo,
      });
    } else {
      const userFound = await UserModel.getUserByRut(user.rut);

      if (!userFound) {
        return res.status(401).json({
          message: "Usuario no encontrado",
        });
      }

      return res.json({
        rut: userFound.usuario_rut,
        nombre: userFound.nombre,
        apellido: userFound.apellido,
        correo: userFound.correo,
        telefono: userFound.telefono,
        direccion: userFound.direccion,
        empresa: userFound.empresa,
        plan_id: userFound.plan_id,
        tipo: tipo,
      });
    }
  });
};

export const getRutByCorreo = async (req, res) => {
  const {correo} = req.body;

  let userFound = await UserModel.getUserByCorreo(correo);

  if (!userFound) {
    return res.status(400).json({
      message: "Este usuario no existe.",
    });
  }

  res.status(200).json({
    message: "El correo es válido",
    usuario_rut: userFound.usuario_rut,
  });
}

export const isValidMail = async (req, res) => {
  const {correo} = req.body;

  let userFound = await UserModel.getUserByCorreo(correo);

  res.status(200).json({
    message: "El correo es válido",
    found: !!userFound,
  });
};

export const requestResetPassword = async (req, res) => {
  const {correo} = req.body;

  const usuario_rut = await UserModel.getRutByEmail(correo);
  if (!usuario_rut) {
    return res.status(400).json({
      message: "Este correo no está asociado a ningún usuario.",
    });
  }

  const token = v4()
  const expiresAt = new Date(Date.now() + 3600000); // 1 hour from now

  try {
    if (!token) {
      return res.status(400).json({
        message: "Error al crear la solicitud de restablecimiento de contraseña.",
      });
    }

    const request = await PassModel.createRequestReset({
      usuario_rut,
      token,
      expires_at: expiresAt,
    });

    if (!request) {
      return res.status(400).json({
        message: "Error al crear la solicitud de restablecimiento de contraseña.",
      });
    }

    const resetLink = "http://localhost:5173/newpassword?token=" + token + "&email=" + correo;

    await transporter.sendMail({
      from: '"Taller Mecánico" <apptallermecanico@gmail.com>',
      to: correo,
      subject: "Solicitud de Restablecimiento de Contraseña",
      html:
        `
                <p>You requested a password reset.</p>
                <p>Click <a href="${resetLink}">here</a> to reset your password. This link is valid for 1 hour.</p>
            `,
    });

    res.status(200).json({
      message: "Solicitud de restablecimiento de contraseña creada exitosamente.",
      token,
    });
  } catch (error) {
    console.error("Error al solicitar el restablecimiento de contraseña", error);
    res.status(500).json({
      message: "Error al solicitar el restablecimiento de contraseña",
      error: error.message,
    });
  }
};

export const resetPassword = async (req, res) => {
  const {email, password, token} = req.body;

  try {
    const request = await PassModel.getRequestResetByToken(token);
    if (!request) {
      return res.status(400).json({
        message: "Solicitud de restablecimiento de contraseña no encontrada.",
      });
    }

    if (new Date() > request.expires_at) {
      return res.status(400).json({
        message: "El enlace de restablecimiento de contraseña ha expirado.",
      });
    }

    const usuario_rut = await UserModel.getRutByEmail(email);

    if (!usuario_rut) {
      return res.status(400).json({
        message: "Este correo no está asociado a ningún usuario.",
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const updatedUser = await PassModel.updatePasswordUser(usuario_rut, passwordHash);

    if (!updatedUser) {
      return res.status(400).json({
        message: "Error al actualizar la contraseña del usuario.",
      });
    }

    await PassModel.deleteRequestByToken(token);

    res.status(200).json({
      message: "Contraseña actualizada exitosamente.",
    });
  } catch (error) {
    console.error("Error al restablecer la contraseña", error);
    res.status(500).json({
      message: "Error al restablecer la contraseña",
      error: error.message,
    });
  }
};
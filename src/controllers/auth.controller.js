import UserModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";
import jwt from "jsonwebtoken";
import { TOKEN_KEY_SECRET } from "../config.js";

export const register = async (req, res) => {
    const { rut, nombre, apellido, correo, password, telefono, direccion } = req.body;

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
        const token = await createAccessToken({ id: newUser.insertId });

        res.cookie("token", token);
        res.json({
            message: responseMessage,
            user: {
                id: newUser.insertId,
                nombre,
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
    const { correo, password } = req.body;

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
            rut: userFound.USUARIO_RUT,
            correo: userFound.CORREO,
            nombre: userFound.NOMBRE,
        });

        res.cookie("token", token);
        /*res.json({
            message: "El Usuario ha sido encontrado exitosamente",
            user: {
                id: userFound.USER_ID,
                email,
            },
        })*/
        return res.status(200).json({
            message: "El Usuario ha sido encontrado exitosamente",
            user: {
                rut: userFound.USUARIO_RUT,
                nombre: userFound.NOMBRE,
                correo: userFound.CORREO,
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
    return res.sendStatus(200);
}

export const verifyToken = async (req, res) => {
    const { token } = req.cookies;
    if (!token) return res.send(false);

    jwt.verify(token, TOKEN_KEY_SECRET, async (error, user) => {
        if (error) return res.sendStatus(401);

        const userFound = await UserModel.getUserById(user.id);
        if (!userFound) return res.sendStatus(401);

        return res.json({
            id: userFound.USER_ID,
            username: userFound.NOMBRE,
            email: userFound.EMAIL,
        });
    });
};

export const profile = async (req, res) => {
    const userFound = await UserModel.getUserById(req.user.id);
    if (!userFound) {
        return res.status(400).json({
            message: "Este usuario no existe.",
        });
    }

    res.json({
        id: userFound.USER_ID,
        nombre: userFound.NOMBRE,
        email: userFound.EMAIL,
        direccion: userFound.DIRECCION,
        numero: userFound.NUMEROTEL,
    })
}
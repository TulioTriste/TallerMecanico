import UserModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";

export const register = async (req, res) => {
    const {nombre, email, password, direccion, numero} = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    var responseMessage;
    let newUser = await UserModel.addUser(nombre, email, passwordHash, direccion, numero);

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
                email,
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
    const {email, password} = req.body;

    var responseMessage;
    let userFound = await UserModel.getUserByEmail(email);

    if (!userFound) {
        //console.error("Usuario no encontrado.", error);
        res.status(400).json({
            message: "Este usuario no existe.",
        });
    }
    
    responseMessage = "El Usuario ha sido encontrado exitosamente";

    const isMatch = await bcrypt.compare(password, userFound.CONTRASENA);

    if (!isMatch) {
        return res.status(400).json({
            message: "Credenciales Invalidas.",
        });
    }

    try {
        const token = await createAccessToken({ 
            id: userFound.USER_ID,
            nombre: userFound.NOMBRE,
        });

        res.cookie("token", token);
        res.json({
            message: responseMessage,
            user: {
                id: userFound.USER_ID,
                email,
            },
        })
    } catch (error) {
        console.error("Error en el registro", error);
        res.status(500).json({
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
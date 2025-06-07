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
        const token = await createAccessToken({ 
            rut: newUser.usuario_rut,
            correo: newUser.correo,
            nombre: newUser.nombre, 
        });

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
            rut: userFound.usuario_rut,
            correo: userFound.correo,
            nombre: userFound.nombre,
        });

        res.cookie("token", token);
        return res.status(200).json({
            message: "El Usuario ha sido encontrado exitosamente",
            user: {
                rut: userFound.usuario_rut,
                nombre: userFound.nombre,
                apellido: userFound.apellido,
                correo: userFound.correo,
                telefono: userFound.telefono,
                direccion: userFound.direccion,
                empresa: userFound.empresa,
                plan_id: userFound.plan_id,
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
    console.log("Cookie de token eliminada");
    return res.status(200);
}

export const verifyToken = async (req, res) => {
    const { token } = req.cookies;
    if (!token) return res.send(false);

    jwt.verify(token, TOKEN_KEY_SECRET, async (error, user) => {
        if (error) {
            console.log("Error al verificar el token", error);
            return res.status(401).json({
                message: "Token no valido",
            });
        }

        const userFound = await UserModel.getUserByRut(user.rut);
        if (!userFound) {
            console.log("Usuario no encontrado");
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
        });
    });
};

export const profile = async (req, res) => {
    const userFound = await UserModel.getUserByRut(req.user.rut);
    if (!userFound) {
        return res.status(400).json({
            message: "Este usuario no existe.",
        });
    }

    res.json({
        user: {
                rut: userFound.usuario_rut,
                nombre: userFound.nombre,
                apellido: userFound.apellido,
                correo: userFound.correo,
                telefono: userFound.telefono,
                direccion: userFound.direccion,
                empresa: userFound.empresa,
                plan_id: userFound.plan_id,
            },
    })
}
// Añade esto al final de tu auth.controller.js
// export const getOwnerWorkshops = async (req, res) => {
//     try {
//         // Obtenemos el RUT del dueño desde el token verificado
//         const ownerRut = req.user.rut;
        
//         // Aquí asumo que tienes un modelo para talleres, similar a UserModel
//         const workshops = await WorkshopModel.getWorkshopsByOwnerRut(ownerRut);
        
//         if (!workshops || workshops.length === 0) {
//             return res.status(404).json({
//                 message: "No se encontraron talleres para este dueño",
//                 workshops: []
//             });
//         }
        
//         res.json({
//             message: "Talleres obtenidos exitosamente",
//             workshops
//         });
        
//     } catch (error) {
//         console.error("Error al obtener talleres:", error);
//         res.status(500).json({
//             message: "Error al obtener talleres",
//             error: error.message
//         });
//     }
// };
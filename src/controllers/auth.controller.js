import UserModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    const {nombre, email, password} = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    var responseMessage = {};
    try {
        const newUser = UserModel.addUser(nombre, email, passwordHash);
        responseMessage = {
            message: "El Usuario ha sido creado exitosamente",
        };
    } catch (error) {
        console.error("Error intentando crear el Usuario en la DB.", error);
        responseMessage = {
            message: "Error intentando crear el Usuario en la BD",
        };
    }

    res.json(responseMessage);
}

export const login = (req, res) => {res.send('login')}
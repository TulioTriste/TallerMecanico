import { connectToDatabase } from "../bd.js";
import sql from "mssql";

class UserModel {
  // Obtener todos los usuarios
  async getAllUsers() {
    try {
      const pool = await connectToDatabase();
      const result = await pool.request().query("SELECT * FROM usuarios");
      return result.recordset; // Devuelve los registros
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      throw error;
    }
  }

  // Agregar un nuevo usuario
  async addUser(nombre, email, password, direccion, numero) {
    try {
      const pool = await connectToDatabase();
      const result = await pool
        .request()
        .input("nombre", sql.VarChar, nombre)
        .input("email", sql.VarChar, email)
        .input("password", sql.VarChar, password)
        .input("direccion", sql.VarChar, direccion)
        .input("numero", sql.VarChar, numero)
        .query(
          "INSERT INTO usuarios (nombre, email, contrasena, direccion, numerotel) VALUES (@nombre, @email, @password, @direccion, @numero)"
        );
      return result; // Devuelve el resultado de la consulta
    } catch (error) {
      console.error("Error al agregar el usuario:", error);
      throw error;
    }
  }

  // Obtener un usuario por ID
  async getUserById(id) {
    try {
      const pool = await connectToDatabase();
      const result = await pool
        .request()
        .input("id", sql.Int, id)
        .query("SELECT * FROM usuarios WHERE user_id = @id");
      return result.recordset[0]; // Devuelve el primer registro
    } catch (error) {
      console.error("Error al obtener el usuario por ID:", error);
      throw error;
    }
  }

  // Obtener un usuario por email
  async getUserByEmail(email) {
    try {
      const pool = await connectToDatabase();
      const result = await pool
        .request()
        .input("email", sql.VarChar, email)
        .query("SELECT * FROM usuarios WHERE email = @email");
      return result.recordset[0]; // Devuelve el primer registro
    } catch (error) {
      console.error("Error al obtener el usuario por email:", error);
      throw error;
    }
  }

  // Actualizar un usuario
  async updateUser(id, nombre, email, password) {
    try {
      const pool = await connectToDatabase();
      const result = await pool
        .request()
        .input("id", sql.Int, id)
        .input("nombre", sql.VarChar, nombre)
        .input("email", sql.VarChar, email)
        .input("password", sql.VarChar, password)
        .query(
          "UPDATE usuarios SET nombre = @nombre, email = @email, contrasena = @password WHERE user_id = @id"
        );
      return result; // Devuelve el resultado de la consulta
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
      throw error;
    }
  }

  // Eliminar un usuario
  async deleteUser(id) {
    try {
      const pool = await connectToDatabase();
      const result = await pool
        .request()
        .input("id", sql.Int, id)
        .query("DELETE FROM usuarios WHERE user_id = @id");
      return result; // Devuelve el resultado de la consulta
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
      throw error;
    }
  }
}

export default new UserModel();
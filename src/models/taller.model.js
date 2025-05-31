import { connectToDatabase } from "../bd.js";
import sql from "mssql";

class TallerModel {
  async getAllTalleres() {
    try {
      const pool = await connectToDatabase();
      const result = await pool.request().query("SELECT * FROM taller");
      return result.recordset; // Devuelve los registros
    } catch (error) {
      console.error("Error al obtener taller:", error);
      throw error;
    }
  }

  async addTaller(rut_dueño, nombre, telefono, correo, direccion, inicio_jornada, termino_jornada) {
    try {
      const pool = await connectToDatabase();
      const result = await pool
        .request()
        .input("usuario_rut", sql.VarChar, rut_dueño)
        .input("nombre", sql.VarChar, nombre)
        .input("telefono", sql.VarChar, telefono)
        .input("direccion", sql.VarChar, direccion)
        .input("correo", sql.VarChar, correo)
        .input("inicio_jornada", sql.Int, inicio_jornada)
        .input("termino_jornada", sql.Int, termino_jornada)
        .query(
          "INSERT INTO taller (usuario_rut, nombre, telefono, direccion, correo, inicio_jornada, termino jornada)" + 
          " VALUES (@usuario_rut, @nombre, @telefono, @direccion, @correo, @inicio_jornada, @termino_jornada)"
        );
      // Devuelve los valores ingresados
      const taller = {
        usuario_rut: rut_dueño,
        nombre: nombre,
        telefono: telefono,
        direccion: direccion,
        correo: correo,
        inicio_jornada: inicio_jornada,
        termino_jornada: termino_jornada,
      };
      return taller;
    } catch (error) {
      console.error("Error al agregar el taller:", error);
      throw error;
    }
  }

  async getTalleresByRut(rut) {
    try {
      const pool = await connectToDatabase();
      const result = await pool
        .request()
        .input("usuario_rut", sql.VarChar, rut)
        .query("SELECT * FROM taller WHERE taller.usuario_rut = @usuario_rut");
      return result.recordset; // Devuelve el primer registro
    } catch (error) {
      console.error("Error al obtener el taller por RUT:", error);
      throw error;
    }
  }

  async getTallerById(id) {
    try {
      const pool = await connectToDatabase();
      const result = await pool
        .request()
        .input("taller_id", sql.Int, id)
        .query("SELECT * FROM taller WHERE taller.taller_id = @taller_id");
      return result.recordset[0]; // Devuelve el primer registro
    } catch (error) {
      console.error("Error al obtener el taller por Id:", error);
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
          "UPDATE usuario SET nombre = @nombre, email = @email, contrasena = @password WHERE user_id = @id"
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
        .query("DELETE FROM usuario WHERE user_id = @id");
      return result; // Devuelve el resultado de la consulta
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
      throw error;
    }
  }
}

export default new TallerModel();
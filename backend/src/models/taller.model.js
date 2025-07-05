import {connectToDatabase} from "../bd.js";
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

  async addTaller(usuario_rut, nombre, telefono, correo, direccion, inicio_jornada, termino_jornada) {
    try {
      const pool = await connectToDatabase();
      const result = await pool
        .request()
        .input("usuario_rut", sql.VarChar, usuario_rut)
        .input("nombre", sql.VarChar, nombre)
        .input("telefono", sql.VarChar, telefono)
        .input("direccion", sql.VarChar, direccion)
        .input("correo", sql.VarChar, correo)
        .input("inicio_jornada", sql.Int, inicio_jornada)
        .input("termino_jornada", sql.Int, termino_jornada)
        .query(
          "INSERT INTO taller (usuario_rut, nombre, telefono, direccion, correo, inicio_jornada, termino_jornada)" +
          " VALUES (@usuario_rut, @nombre, @telefono, @direccion, @correo, @inicio_jornada, @termino_jornada)"
        );
      // Devuelve los valores ingresados
      return result.rowsAffected[0] > 0;
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

  async deleteTaller(id) {
    try {
      const pool = await connectToDatabase();
      const result = await pool
        .request()
        .input("taller_id", sql.Int, id)
        .query("DELETE FROM taller WHERE taller.taller_id = @taller_id");
      return result.rowsAffected[0] > 0; // Devuelve true si se eliminó al menos un registro
    } catch (error) {
      console.error("Error al eliminar el taller:", error);
      throw error;
    }
  }

  async updateTaller(taller_id, { nombre, telefono, correo, direccion, inicio_jornada, termino_jornada }) {
    try {
      const pool = await connectToDatabase();
      const result = await pool
        .request()
        .input("taller_id", sql.Int, taller_id)
        .input("nombre", sql.VarChar, nombre)
        .input("telefono", sql.VarChar, telefono)
        .input("direccion", sql.VarChar, direccion)
        .input("correo", sql.VarChar, correo)
        .input("inicio_jornada", sql.Int, inicio_jornada)
        .input("termino_jornada", sql.Int, termino_jornada)
        .query(`
          UPDATE taller 
          SET nombre = @nombre,
              telefono = @telefono,
              direccion = @direccion,
              correo = @correo,
              inicio_jornada = @inicio_jornada,
              termino_jornada = @termino_jornada
          WHERE taller_id = @taller_id
        `);
      
      return result.rowsAffected[0] > 0; // Retorna true si se actualizó algún registro
    } catch (error) {
      console.error("Error al actualizar el taller:", error);
      throw error;
    }
  }
}

export default new TallerModel();
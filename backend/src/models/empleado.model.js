import {connectToDatabase} from "../bd.js";
import sql from "mssql";

class EmpleadoModel {

  async insertEmpleado(data) {
    try {
      const pool = await connectToDatabase();
      const request = pool.request();

      request
        .input("empleado_rut", sql.VarChar, data.empleado_rut)
        .input("taller_id", sql.Int, data.taller_id)
        .input("roles_id", sql.Int, data.roles_id)
        .input("nombre", sql.VarChar, data.nombre)
        .input("apellido", sql.VarChar, data.apellido)
        .input("cel", sql.VarChar, data.telefono)
        .input("correo", sql.VarChar, data.correo)
        .input("password", sql.VarChar, data.password);

      const result = await request.query(`
        INSERT INTO empleado (empleado_rut, taller_id, roles_id, nombre, apellido, cel, correo, password)
        VALUES (@empleado_rut, @taller_id, @roles_id, @nombre, @apellido, @cel, @correo, @password)
      `);

      // Check if the insert was successful
      if (result.rowsAffected.length === 0) {
        throw new Error("No rows were affected by the insert operation.");
      }

      return result.rowsAffected[0] > 0;
    } catch (error) {
      console.error("Error inserting empleado:", error);
      throw error;
    }
  }

  async getEmpleadosByTaller(taller_id) {
    try {
      const pool = await connectToDatabase();
      const request = pool.request();
      request.input("taller_id", sql.Int, taller_id);

      const result = await request.query(`
        SELECT 
            e.empleado_rut,
            e.taller_id,
            e.roles_id,
            e.nombre,
            e.apellido,
            e.cel,
            e.correo,
            r.nombre AS nombre_rol
        FROM empleado e
        INNER JOIN roles r ON e.roles_id = r.roles_id
        WHERE e.taller_id = @taller_id
      `);

      return result.recordset;
    } catch (error) {
      console.error("Error fetching empleados by taller:", error);
      throw error;
    }
  }

  async deleteEmpleado(empleado_rut) {
    try {
      const pool = await connectToDatabase();
      const request = pool.request();
      request.input("empleado_rut", sql.VarChar, empleado_rut);

      const result = await request.query(`
        DELETE FROM empleado WHERE empleado_rut = @empleado_rut
      `);

      return result.rowsAffected[0] > 0;
    } catch (error) {
      console.error("Error deleting empleado:", error);
      throw error;
    }
  }

  async isEmpleadoExist(empleado_rut) {
    try {
      const pool = await connectToDatabase();
      const request = pool.request();
      request.input("empleado_rut", sql.VarChar, empleado_rut);

      const result = await request.query(`
        SELECT COUNT(*) AS count FROM empleado WHERE empleado_rut = @empleado_rut
      `);

      return result.recordset[0].count > 0;
    } catch (error) {
      console.error("Error checking if empleado exists:", error);
      throw error;
    }
  }

  async getByRut(empleado_rut) {
    try {
      const pool = await connectToDatabase();
      const request = pool.request();
      request.input("empleado_rut", sql.VarChar, empleado_rut);

      const result = await request.query(`
        SELECT 
            e.empleado_rut,
            e.taller_id,
            e.roles_id,
            e.nombre,
            e.apellido,
            e.cel,
            e.correo,
            r.nombre AS nombre_rol
        FROM empleado e
        INNER JOIN roles r ON e.roles_id = r.roles_id
        WHERE e.empleado_rut = @empleado_rut
      `);

      return result.recordset[0];
    } catch (error) {
      console.error("Error fetching empleado by rut:", error);
      throw error;
    }
  }

  async getByCorreo(correo) {
    try {
      const pool = await connectToDatabase();
      const request = pool.request();
      request.input("correo", sql.VarChar, correo);

      const result = await request.query(`
        SELECT 
            e.empleado_rut,
            e.taller_id,
            e.roles_id,
            e.nombre,
            e.apellido,
            e.cel,
            e.correo,
            e.password,
            r.nombre AS nombre_rol
        FROM empleado e
        INNER JOIN roles r ON e.roles_id = r.roles_id
        WHERE e.correo = @correo
      `);

      return result.recordset[0];
    } catch (error) {
      console.error("Error fetching empleado by correo:", error);
      throw error;
    }
  }

  async getTallerByRut(empleado_rut) {
    try {
      const pool = await connectToDatabase();
      const request = pool.request()
                            .input("empleado_rut", sql.VarChar, empleado_rut);

      const result = await request.query(`
        SELECT 
            e.taller_id,
            t.nombre AS taller_nombre
        FROM empleado e
        INNER JOIN taller t ON e.taller_id = t.taller_id
        WHERE e.empleado_rut = @empleado_rut
      `);

      return result.recordset[0];
    } catch (error) {
      console.error("Error fetching taller by empleado rut:", error);
      throw error;
    }
  }
}

export default new EmpleadoModel();
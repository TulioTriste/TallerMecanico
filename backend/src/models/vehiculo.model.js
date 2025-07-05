import {connectToDatabase} from "../bd.js";
import sql from "mssql";

class VehiculoModel {

  async getVehiculoName(patente) {
    try {
      const pool = await connectToDatabase();
      const result = await pool
        .request()
        .input("patente", sql.VarChar, patente)
        .query(`
            SELECT 
                (marca + ' ' + modelo + ' ' + CAST(anio as VARCHAR(5))) nombre 
            FROM 
                vehiculo v
            WHERE v.patente = @patente`);

      return result.recordset[0].nombre;
    } catch (error) {
      console.error("Error al obtener el nombre de el cliente por RUT:", error);
      throw error;
    }
  }

  async getVehiculoByPatente(patente) {
    try {
      const pool = await connectToDatabase();
      const result = await pool
        .request()
        .input("patente", sql.VarChar, patente)
        .query("SELECT * FROM vehiculo WHERE patente = @patente");
      return result.recordset[0];
    } catch (error) {
      console.error("Error al obtener el vehículo por patente:", error);
      throw error;
    }
  }

  async createVehiculo(vehiculo) {
    try {
      const pool = await connectToDatabase();
      const result = await pool
        .request()
        .input("patente", sql.VarChar, vehiculo.patente)
        .input("marca", sql.VarChar, vehiculo.marca)
        .input("modelo", sql.VarChar, vehiculo.modelo)
        .input("anio", sql.Int, vehiculo.anio)
        .input("cliente_rut", sql.VarChar, vehiculo.cliente_rut)
        .input("color", sql.VarChar, vehiculo.color)
        .query(`
            INSERT INTO vehiculo (patente, cliente_rut, marca, modelo, anio, color) 
            VALUES (@patente, @cliente_rut, @marca, @modelo, @anio, @color)`);
      return result.rowsAffected[0];
    } catch (error) {
      console.error("Error al crear el vehículo:", error);
      throw error;
    }
  }

  async isExists(patente) {
    try {
      const pool = await connectToDatabase();
      const result = await pool
        .request()
        .input("patente", sql.VarChar, patente)
        .query("SELECT COUNT(*) AS count FROM vehiculo WHERE patente = @patente");
      return result.recordset[0].count > 0;
    } catch (error) {
      console.error("Error al verificar si el vehículo existe:", error);
      throw error;
    }
  }
}

export default new VehiculoModel();
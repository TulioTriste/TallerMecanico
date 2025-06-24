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
}

export default new VehiculoModel();
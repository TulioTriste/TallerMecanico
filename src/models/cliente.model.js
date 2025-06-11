import { connectToDatabase } from "../bd.js";
import sql from "mssql";

class ClienteModel {
  
  async getAllClientes() {
    try {
      const pool = await connectToDatabase();
      const result = await pool.request().query("SELECT * FROM cliente");
      return result.recordset; // Devuelve los registros
    } catch (error) {
      console.error("Error al obtener usuario:", error);
      throw error;
    }
  }

  async getNameByRut(rut) {
    try {
      const pool = await connectToDatabase();
      const result = await pool
        .request()
        .input("cliente_rut", sql.VarChar, rut)
        .query("SELECT nombre FROM cliente WHERE cliente_rut = @cliente_rut");
      return result.recordset[0].nombre;
    } catch (error) {
      console.error("Error al obtener el nombre de el cliente por RUT:", error);
      throw error;
    }
  }
}

export default new ClienteModel();
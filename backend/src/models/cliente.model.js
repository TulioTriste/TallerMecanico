import {connectToDatabase} from "../bd.js";
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

  async getClienteByRut(rut) {
    try {
      const pool = await connectToDatabase();
      const result = await pool
        .request()
        .input("cliente_rut", sql.VarChar, rut)
        .query("SELECT * FROM cliente WHERE cliente_rut = @cliente_rut");
      return result.recordset[0]; // Devuelve el primer registro encontrado
    } catch (error) {
      console.error("Error al obtener el cliente por RUT:", error);
      throw error;
    }
  }

  async createCliente(cliente) {
    try {
      const pool = await connectToDatabase();
      const result = await pool
        .request()
        .input("cliente_rut", sql.VarChar, cliente.cliente_rut)
        .input("nombre", sql.VarChar, cliente.nombre)
        .input("telefono", sql.VarChar, cliente.telefono)
        .input("correo", sql.VarChar, cliente.correo)
        .query("INSERT INTO cliente (cliente_rut, nombre, correo, telefono) VALUES (@cliente_rut, @nombre, @correo, @telefono)");
      return result.rowsAffected[0]; // Devuelve el número de filas afectadas
    } catch (error) {
      console.error("Error al crear el cliente:", error);
      throw error;
    }
  }

  async isExists(cliente_rut) {
    try {
      const pool = await connectToDatabase();
      const result = await pool
        .request()
        .input("cliente_rut", sql.VarChar, cliente_rut)
        .query("SELECT COUNT(*) AS count FROM cliente WHERE cliente_rut = @cliente_rut");
      return result.recordset[0].count > 0; // Devuelve true si existe, false si no
    } catch (error) {
      console.error("Error al verificar la existencia del cliente:", error);
      throw error;
    }
  }
}

export default new ClienteModel();
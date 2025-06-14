import {connectToDatabase} from "../bd.js";
import sql from "mssql";

class OtModel {
  async addOt(cliente_rut, taller_id, vehiculo_patente, empleado_rut, fecha_salida, descripcion, km, estado_id, precio) {
    try {
      const pool = await connectToDatabase();
      const result = await pool
        .request()
        .input("cliente_rut", sql.VarChar, cliente_rut)
        .input("taller_id", sql.Int, taller_id)
        .input("vehiculo_patente", sql.VarChar, vehiculo_patente)
        .input("empleado_rut", sql.VarChar, empleado_rut)
        .input("fecha_salida", sql.DateTime, fecha_salida)
        .input("descripcion", sql.VarChar, descripcion)
        .input("km", sql.Int, km)
        .input("estado_id", sql.Int, estado_id)
        .input("precio", sql.Decimal(18, 2), precio)
        .query(
          `INSERT INTO ot (cliente_rut, taller_id, vehiculo_patente, empleado_rut, fecha_salida, descripcion, km, estado_id, precio)
          VALUES (@cliente_rut, @taller_id, @vehiculo_patente, @empleado_rut, @fecha_salida, @descripcion, @km, @estado_id, @precio)`
        );
      return result.rowsAffected[0] > 0; // Devuelve true si se insertó correctamente
    } catch (error) {
      console.error("Error al agregar la OT:", error);
      throw error;
    }
  }

  async updateOt(id, cliente_rut, taller_id, vehiculo_patente, empleado_rut, fecha_salida, descripcion, km, estado_id, precio) {
    try {
      const pool = await connectToDatabase();
      const result = await pool
        .request()
        .input("ot_id", sql.Int, id)
        .input("cliente_rut", sql.VarChar, cliente_rut)
        .input("taller_id", sql.Int, taller_id)
        .input("vehiculo_patente", sql.VarChar, vehiculo_patente)
        .input("empleado_rut", sql.VarChar, empleado_rut)
        .input("fecha_salida", sql.DateTime, fecha_salida)
        .input("descripcion", sql.VarChar, descripcion)
        .input("km", sql.Int, km)
        .input("estado_id", sql.Int, estado_id)
        .input("precio", sql.Decimal(18, 2), precio)
        .query(
          `UPDATE ot SET cliente_rut = @cliente_rut, taller_id = @taller_id, vehiculo_patente = @vehiculo_patente,
          empleado_rut = @empleado_rut, fecha_salida = @fecha_salida, descripcion = @descripcion,
          km = @km, estado_id = @estado_id, precio = @precio WHERE ot_id = @ot_id`
        );
      return result.rowsAffected[0] > 0; // Devuelve true si se actualizó correctamente
    } catch (error) {
      console.error("Error al actualizar la OT:", error);
      throw error;
    }
  }
}

export default new OtModel();
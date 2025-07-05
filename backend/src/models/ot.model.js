import {connectToDatabase} from "../bd.js";
import sql from "mssql";

class OtModel {
  async addOt(ot) {
    try {
      const pool = await connectToDatabase();
      const result = await pool
        .request()
        .input("cliente_rut", sql.VarChar, ot.cliente_rut)
        .input("taller_id", sql.Int, ot.taller_id)
        .input("vehiculo_patente", sql.VarChar, ot.vehiculo_patente)
        .input("empleado_rut", sql.VarChar, ot.empleado_rut)
        .input("fecha_salida", sql.DateTime, ot.fecha_salida)
        .input("descripcion", sql.VarChar, ot.descripcion)
        .input("km", sql.Int, ot.km)
        .input("estado_id", sql.Int, ot.estado_id)
        .input("precio", sql.Int, ot.precio)
        .input("uniqueId", sql.VarChar, ot.uniqueId)
        .query(
          `INSERT INTO ot (cliente_rut, taller_id, vehiculo_patente, empleado_rut, fecha_salida, descripcion, km, estado_id, precio, uniqueId)
          VALUES (@cliente_rut, @taller_id, @vehiculo_patente, @empleado_rut, @fecha_salida, @descripcion, @km, @estado_id, @precio, @uniqueId);
          SELECT SCOPE_IDENTITY() AS ot_id;`
        );

      const insertedId = result.recordset[0].ot_id;
      return {
        success: result.rowsAffected[0] > 0,
        ot_id: insertedId
      };
    } catch (error) {
      console.error("Error al agregar la OT:", error);
      throw error;
    }
  }

  async getOtById(id) {
    try {
      const pool = await connectToDatabase();
      const result = await pool
        .request()
        .input("ot_id", sql.Int, id)
        .query(`SELECT
                    ot.*,
                    
                    e.nombre AS estado_nombre,

                    v.marca AS vehiculo_marca,
                    v.modelo AS vehiculo_modelo,
                    v.anio AS vehiculo_anio,
                    v.color AS vehiculo_color,
                    v.created_at AS vehiculo_created_at,

                    t.nombre AS taller_nombre,
                    t.direccion AS taller_direccion,
                    t.telefono AS taller_telefono,
                    t.correo AS taller_correo,

                    c.nombre AS cliente_nombre,
                    c.telefono AS cliente_telefono,
                    c.correo AS cliente_correo
                FROM
                    ot
                        LEFT JOIN
                    vehiculo v ON ot.vehiculo_patente = v.patente
                        LEFT JOIN
                    taller t ON ot.taller_id = t.taller_id
                        LEFT JOIN
                    cliente c ON v.cliente_rut = c.cliente_rut
                        LEFT JOIN
                    estado e ON ot.estado_id = e.estado_id
                WHERE
                    ot.ot_id = @ot_id`);
      return result.recordset[0];
    } catch (error) {
      console.error("Error al obtener la OT por ID:", error);
      throw error;
    }
  }

  async getOtByUniqueId(uniqueId) {
    try {
      const pool = await connectToDatabase();
      const result = await pool
        .request()
        .input("uniqueId", sql.VarChar, uniqueId)
        .query(`SELECT 
                    ot.*,

                    e.nombre AS estado_nombre,

                    v.marca AS vehiculo_marca,
                            v.modelo AS vehiculo_modelo,
                            v.anio AS vehiculo_anio,
                            v.color AS vehiculo_color,
                            v.created_at AS vehiculo_created_at,

                            t.nombre AS taller_nombre,
                            t.direccion AS taller_direccion,
                            t.telefono AS taller_telefono,
                            t.correo AS taller_correo,

                            c.nombre AS cliente_nombre,
                            c.telefono AS cliente_telefono,
                            c.correo AS cliente_correo
                FROM
                    ot
                        LEFT JOIN
                    vehiculo v ON ot.vehiculo_patente = v.patente
                        LEFT JOIN
                    taller t ON ot.taller_id = t.taller_id
                        LEFT JOIN
                    cliente c ON v.cliente_rut = c.cliente_rut
                        LEFT JOIN
                    estado e ON ot.estado_id = e.estado_id
                WHERE uniqueId = @uniqueId`);
      return result.recordset[0];
    } catch (error) {
      console.error("Error al obtener la OT por uniqueId:", error);
      throw error;
    }
  }

  async getHistorialByOtId(otId) {
    try {
      const pool = await connectToDatabase();
      const result = await pool
        .request()
        .input("ot_id", otId)
        .query(`
            SELECT
                h.historial_id,
                ea.nombre AS estado_anterior,
                en.nombre AS estado_nuevo,
                h.fecha_cambio
            FROM
                [ot_estado_historial] h
                    LEFT JOIN
                [estado] ea ON h.estado_anterior_id = ea.estado_id
                    JOIN
                [estado] en ON h.estado_nuevo_id = en.estado_id
            WHERE
                h.ot_id = @ot_id
            ORDER BY
                h.fecha_cambio DESC;
        `);

      return result.recordset;
    } catch (error) {
      console.error("Error al obtener historial de OT:", error);
      throw error;
    }
  }

  async addTaskToOt(otId, body) {
    try {
      let { descripcion, ruta_imagenes } = body;

      const pool = await connectToDatabase();
      const result = await pool
        .request()
        .input("ot_id", sql.Int, otId)
        .input("titulo", sql.VarChar, body.titulo || "Tarea sin título")
        .input("descripcion", sql.VarChar, descripcion)
        .input("ruta_imagenes", sql.VarChar, JSON.stringify(ruta_imagenes))
        .query(
          `INSERT INTO ot_tareas (ot_id, titulo, descripcion, ruta_imagenes)
          VALUES (@ot_id, @titulo, @descripcion, @ruta_imagenes)`
        );
      return result.rowsAffected[0] > 0; // Devuelve true si se insertó correctamente
    } catch (error) {
      console.error("Error al agregar tarea a la OT:", error);
      throw error;
    }
  }

  async getTasksByOtId(otId) {
    try {
      const pool = await connectToDatabase();
      const result = await pool
        .request()
        .input("ot_id", sql.Int, otId)
        .query(`
            SELECT
                ot_tareas.tarea_id,
                ot_tareas.titulo,
                ot_tareas.descripcion,
                ot_tareas.ruta_imagenes
            FROM
                ot_tareas
            WHERE
                ot_tareas.ot_id = @ot_id
            ORDER BY
                ot_tareas.created_at DESC;
        `);
      return result.recordset;
    } catch (error) {
      console.error("Error al obtener tareas de la OT:", error);
      throw error;
    }
  }

  async updateOrCreateTasks(otId, tasks) {
    try {
      const pool = await connectToDatabase();
      const transaction = new sql.Transaction(pool);
      await transaction.begin();

      const request = new sql.Request(transaction);
      request.input("ot_id", sql.Int, otId);

      // Primero, eliminamos las tareas existentes para esta OT
      await request.query(`DELETE FROM ot_tareas WHERE ot_id = @ot_id`);

      // Luego, insertamos las nuevas tareas
      for (const task of tasks) {
        request.input("titulo", sql.VarChar, task.titulo)
                .input("descripcion", sql.VarChar, task.descripcion)
                .input("ruta_imagenes", sql.VarChar, JSON.stringify(task.ruta_imagenes));
        await request.query(
          `INSERT INTO ot_tareas (ot_id, titulo, descripcion, ruta_imagenes)
          VALUES (@ot_id, @titulo, @descripcion, @ruta_imagenes)`
        );
      }

      await transaction.commit();
      return true; // Devuelve true si se actualizó correctamente
    } catch (error) {
      console.error("Error al actualizar o crear tareas de la OT:", error);
      throw error;
    }
  }

  async updateOt(ot_id, orden) {
    try {
      const pool = await connectToDatabase();
      const result = await pool
        .request()
        .input("ot_id", sql.Int, ot_id)
        .input("cliente_rut", sql.VarChar, orden.cliente_rut)
        .input("taller_id", sql.Int, orden.taller_id)
        .input("vehiculo_patente", sql.VarChar, orden.vehiculo_patente)
        .input("empleado_rut", sql.VarChar, orden.empleado_rut)
        .input("fecha_salida", sql.DateTime, orden.fecha_salida)
        .input("descripcion", sql.VarChar, orden.descripcion)
        .input("km", sql.Int, orden.km)
        .input("estado_id", sql.Int, orden.estado_id)
        .input("precio", sql.Int, orden.precio)
        .query(
          `UPDATE ot SET cliente_rut = @cliente_rut, taller_id = @taller_id, vehiculo_patente = @vehiculo_patente,
          empleado_rut = @empleado_rut, fecha_salida = @fecha_salida, descripcion = @descripcion,
          km = @km, estado_id = @estado_id, precio = @precio WHERE ot_id = @ot_id`
        );
      return result.rowsAffected[0] > 0;
    } catch (error) {
      console.error("Error al actualizar la OT:", error);
      throw error;
    }
  }

  async getOtsByTallerId(taller_id) {
    try {
      const pool = await connectToDatabase();
      const result = await pool
        .request()
        .input("taller_id", sql.Int, taller_id)
        .query(`
            SELECT
                ot.ot_id,
                ot.cliente_rut,
                ot.vehiculo_patente,
                ot.estado_id,
                ot.descripcion,
                CONCAT(emp.nombre, ' ', emp.apellido) AS tecnico,
                ot.fecha_entrada,
                ot.fecha_salida,
                c.nombre AS cliente,
                CONCAT(v.marca, ' ', v.modelo, ' ', v.anio) AS vehiculo
            FROM
                ot
                  LEFT JOIN vehiculo v ON ot.vehiculo_patente = v.patente
                  LEFT JOIN cliente c ON ot.cliente_rut = c.cliente_rut
                  LEFT JOIN empleado emp ON ot.empleado_rut = emp.empleado_rut
            WHERE ot.taller_id = @taller_id
            ORDER BY ot.fecha_salida DESC;
        `);
      return result.recordset;
    } catch (error) {
      console.error("Error al obtener OTs por ID de taller:", error);
      throw error;
    }
  }

  async deleteTaskById(taskId) {
    try {
      const pool = await connectToDatabase();
      const result = await pool
        .request()
        .input("tarea_id", sql.Int, taskId)
        .query(`DELETE FROM ot_tareas WHERE tarea_id = @tarea_id`);
      return result.rowsAffected[0] > 0; // Devuelve true si se eliminó correctamente
    } catch (error) {
      console.error("Error al eliminar la tarea:", error);
      throw error;
    }
  }

}

export default new OtModel();
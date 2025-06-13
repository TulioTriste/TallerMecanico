import {connectToDatabase} from "../bd.js";
import sql from "mssql";

class ControlPanelModel {
  async getCountRegisteredVehicles() {
    try {
      const pool = await connectToDatabase();
      const result = await pool.request().query("SELECT COUNT(*) AS total FROM vehiculo");
      return result.recordset[0].total;
    } catch (error) {
      console.error("Error al obtener el conteo de vehículos registrados:", error);
      throw error;
    }
  }

  async getCountOrdenesTrabajo() {
    try {
      const pool = await connectToDatabase();
      const result = await pool.request().query("SELECT COUNT(*) AS total FROM ot");
      return result.recordset[0].total;
    } catch (error) {
      console.error("Error al obtener el conteo de órdenes de trabajo:", error);
      throw error;
    }
  }

  async getCountClientes() {
    try {
      const pool = await connectToDatabase();
      const result = await pool.request().query("SELECT COUNT(*) AS total FROM cliente");
      return result.recordset[0].total;
    } catch (error) {
      console.error("Error al obtener el conteo de clientes:", error);
      throw error;
    }
  }

  async getCountCitas() {
    try {
      const pool = await connectToDatabase();
      const result = await pool.request().query(`
                SELECT COUNT(*) AS total 
                FROM cita 
                WHERE MONTH(fecha) = MONTH(GETDATE()) AND YEAR(fecha) = YEAR(GETDATE())
            `);
      return result.recordset[0].total;
    } catch (error) {
      console.error("Error al obtener el conteo de citas:", error);
      throw error;
    }
  }

  async getNextCita(taller_id) {
    try {
      const pool = await connectToDatabase();
      const result = await pool.request()
        .input("tallerId", sql.Int, taller_id)
        .query(`
                    SELECT TOP 1
                        c.cliente_rut,
                        cl.nombre AS nombre_cliente,
                        c.patente,
                        v.marca,
                        v.modelo,
                        c.hora,
                        c.descripcion
                    FROM 
                        cita c
                        INNER JOIN cliente cl ON c.cliente_rut = cl.cliente_rut
                        INNER JOIN vehiculo v ON c.patente = v.patente
                    WHERE 
                        c.hora > GETDATE()
                        AND c.taller_id = @tallerId
                    ORDER BY 
                        c.hora ASC
                `);
      if (result.recordset.length > 0) {
        return result.recordset[0];
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error al obtener la próxima cita:", error);
      throw error;
    }
  }

  async getOrdenesDeTrabajoCount(taller_id) {
    try {
      const pool = await connectToDatabase();
      const result = await pool.request()
        .input("tallerId", sql.Int, taller_id)
        .query(`
                    SELECT 
                        COUNT(*) AS total
                    FROM 
                        ot
                    WHERE 
                        taller_id = @tallerId
                `);

      if (result.recordset.length === 0) {
        return 0;
      }

      return result.recordset[0].total;
    } catch (error) {
      console.error("Error al obtener el conteo de órdenes de trabajo:", error);
      throw error;
    }
  }

  async getOrdenesDeTrabajoCountByEstado(taller_id, estado_id) {
    try {
      const pool = await connectToDatabase();
      const result = await pool.request()
        .input("tallerId", sql.Int, taller_id)
        .input("estadoId", sql.Int, estado_id)
        .query(`
                    SELECT 
                        COUNT(*) AS total
                    FROM 
                        ot
                    WHERE 
                        taller_id = @tallerId AND estado_id = @estadoId
                    GROUP BY 
                        taller_id
                `);

      if (result.recordset.length === 0) {
        return 0;
      }

      return result.recordset[0].total;
    } catch (error) {
      console.error("Error al obtener el conteo de órdenes de trabajo:", error);
      throw error;
    }
  }

  async getCountCitasProx7Dias(taller_id) {
    try {
      const pool = await connectToDatabase();
      const result = await pool.request()
        .input("tallerId", sql.Int, taller_id)
        .query(`
                    SELECT 
                        COUNT(*) AS total
                    FROM 
                        cita
                    WHERE 
                        hora >= CAST(GETDATE() AS DATE)
                        AND hora < DATEADD(DAY, 7, CAST(GETDATE() AS DATE))
                        AND taller_id = @tallerId
                `);

      if (result.recordset.length === 0) {
        return 0;
      }

      return result.recordset[0].total;
    } catch (error) {
      console.error("Error al obtener el conteo de citas en los próximos 7 días:", error);
      throw error;
    }
  }

  async getCountOTMes(taller_id) {
    try {
      const pool = await connectToDatabase();
      const result = await pool.request()
        .input("tallerId", sql.Int, taller_id)
        .query(`
                    SELECT 
                        COUNT(*) AS total
                    FROM 
                        ot
                    WHERE MONTH(fecha_entrada) = MONTH(GETDATE())
                        AND YEAR(fecha_entrada) = YEAR(GETDATE())
                        AND taller_id = @tallerId
                `);

      if (result.recordset.length === 0) {
        return 0;
      }

      return result.recordset[0].total;
    } catch (error) {
      console.error("Error al obtener el conteo de órdenes de trabajo del mes:", error);
      throw error;
    }
  }

  async getRecentOTs(taller_id, days) {
    try {
      const pool = await connectToDatabase();
      const result = await pool.request()
        .input("tallerId", sql.Int, taller_id)
        .input("days", sql.Int, days)
        .query(`
                    SELECT 
                        *
                    FROM 
                        ot
                    WHERE 
                        taller_id = @tallerId
                        AND fecha_entrada >= DATEADD(DAY, -@days, CAST(GETDATE() AS DATE))
                        AND fecha_entrada < DATEADD(DAY, (@days + 1), CAST(GETDATE() AS DATE))
                    ORDER BY fecha_entrada DESC
                `);
      return result.recordset;
    } catch (error) {
      console.error("Error al obtener las órdenes de trabajo recientes:", error);
      throw error;
    }
  }

  async getCitasHoy(taller_id) {
    try {
      const pool = await connectToDatabase();
      const result = await pool.request()
        .input("tallerId", sql.Int, taller_id)
        .query(`
                    SELECT 
                        c.cita_id,
                        c.cliente_rut,
                        cl.nombre AS nombre_cliente,
                        c.patente,
                        v.marca + ' ' + v.modelo + ' ' + CAST(v.anio AS VARCHAR(5)) AS nombre_vehiculo,
                        c.hora,
                        c.descripcion
                    FROM 
                        cita c
                        INNER JOIN cliente cl ON c.cliente_rut = cl.cliente_rut
                        INNER JOIN vehiculo v ON c.patente = v.patente
                    WHERE 
                        CAST(c.hora AS DATE) = CAST(GETDATE() AS DATE)
                        AND c.taller_id = @tallerId
                    ORDER BY 
                        c.hora ASC
                `);
      return result.recordset;
    } catch (error) {
      console.error("Error al obtener las citas de hoy:", error);
      throw error;
    }
  }

  async getIngresosDelMes(taller_id) {
    try {
      const pool = await connectToDatabase();
      const result = await pool.request()
        .input("tallerId", sql.Int, taller_id)
        .query(`
                    SELECT 
                        SUM(precio) AS total
                    FROM 
                        ot
                    WHERE 
                        MONTH(fecha_salida) = MONTH(GETDATE())
                        AND YEAR(fecha_salida) = YEAR(GETDATE())
                        AND estado_id = 3
                        AND taller_id = @tallerId
                `); // estado_id = 3 asume que es el estado "completado"
                    // Se toma de referencia la fecha de salida para calcular los ingresos del mes

      if (result.recordset.length === 0 || result.recordset[0].total === null) {
        return 0;
      }

      return result.recordset[0].total;
    } catch (error) {
      console.error("Error al obtener los ingresos del mes:", error);
      throw error;
    }
  }

  async getRoles() {
    try {
      const pool = await connectToDatabase();
      const result = await pool.request().query("SELECT * FROM roles");
      return result.recordset;
    } catch (error) {
      console.error("Error al obtener los roles:", error);
      throw error;
    }
  }
}

export default new ControlPanelModel();
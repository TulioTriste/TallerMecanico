import {connectToDatabase} from "../bd.js";
import sql from "mssql";

class UserModel {
  // Obtener todos los usuarios
  async getAllUsers() {
    try {
      const pool = await connectToDatabase();
      const result = await pool.request().query("SELECT * FROM usuario");
      return result.recordset; // Devuelve los registros
    } catch (error) {
      console.error("Error al obtener usuario:", error);
      throw error;
    }
  }

  // Agregar un nuevo usuario
  async addUser(rut, nombre, apellido, correo, password, telefono, direccion) {
    try {
      const pool = await connectToDatabase();
      const result = await pool
        .request()
        .input("usuario_rut", sql.VarChar, rut)
        .input("nombre", sql.VarChar, nombre)
        .input("apellido", sql.VarChar, apellido)
        .input("correo", sql.VarChar, correo)
        .input("password", sql.VarChar, password)
        .input("telefono", sql.VarChar, telefono)
        .input("direccion", sql.VarChar, direccion)
        .query(
          "INSERT INTO usuario (usuario_rut, nombre, apellido, correo, password, telefono, direccion) VALUES (@usuario_rut, @nombre, @apellido, @correo, @password, @telefono, @direccion)"
        );
      // Devuelve los valores ingresados
      const user = {
        usuario_rut: rut,
        nombre: nombre,
        apellido: apellido,
        correo: correo,
        password: password,
        telefono: telefono,
        direccion: direccion,
      };
      return user;
      //return result; // Devuelve el resultado de la consulta
    } catch (error) {
      console.error("Error al agregar el usuario:", error);
      throw error;
    }
  }

  // Obtener un usuario por ID
  async getUserByRut(rut) {
    try {
      const pool = await connectToDatabase();
      const result = await pool
        .request()
        .input("usuario_rut", sql.VarChar, rut)
        .query("SELECT * FROM usuario WHERE usuario_rut = @usuario_rut");
      return result.recordset[0]; // Devuelve el primer registro
    } catch (error) {
      console.error("Error al obtener el usuario por RUT:", error);
      throw error;
    }
  }

  // Obtener un usuario por correo
  async getUserByCorreo(correo) {
    try {
      const pool = await connectToDatabase();
      const result = await pool
        .request()
        .input("correo", sql.VarChar, correo)
        .query("SELECT * FROM usuario WHERE correo = @correo");
      return result.recordset[0]; // Devuelve el primer registro
    } catch (error) {
      console.error("Error al obtener el usuario por correo:", error);
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

  async hasPlanUser(rut) {
    try {
      const pool = await connectToDatabase();
      const result = await pool
        .request()
        .input("usuario_rut", sql.VarChar, rut)
        .query(`SELECT 
                    plan_id
                FROM 
                    usuario
                WHERE usuario_rut = @usuario_rut`);

      return result.recordset[0]
        && result.recordset[0].plan_id !== undefined
        && result.recordset[0].plan_id !== null;
    } catch (error) {
      console.error("Error al verificar si el usuario tiene un plan:", error);
      throw error;
    }
  }

  async getPlanUser(rut) {
    try {
      const pool = await connectToDatabase();
      const result = await pool
        .request()
        .input("usuario_rut", sql.VarChar, rut)
        .query(`SELECT 
                    plan_id
                FROM 
                    usuario
                WHERE usuario_rut = @usuario_rut`);

      return result.recordset[0].plan_id; // Devuelve el ID del plan del usuario
    } catch (error) {
      console.error("Error al obtener el plan del usuario:", error);
      throw error;
    }
  }

  async getRutByEmail(email) {
    try {
      const pool = await connectToDatabase();
      const result = await pool
        .request()
        .input("correo", sql.VarChar, email)
        .query("SELECT usuario_rut FROM usuario WHERE correo = @correo");
      return result.recordset[0] ? result.recordset[0].usuario_rut : null; // Devuelve el RUT del usuario o null si no se encuentra
    } catch (error) {
      console.error("Error al obtener el RUT por correo:", error);
      throw error;
    }
  }

  async updateUserPassword(rut, newPassword) {
    try {
      const pool = await connectToDatabase();
      const result = await pool
        .request()
        .input("usuario_rut", sql.VarChar, rut)
        .input("password", sql.VarChar, newPassword)
        .query("UPDATE usuario SET password = @password WHERE usuario_rut = @usuario_rut");
      return result;
    } catch (error) {
      console.error("Error al actualizar la contraseña del usuario:", error);
      throw error;
    }
  }

  async getLimitTalleres(rut) {
    try {
      const pool = await connectToDatabase();
      const result = await pool
          .request()
          .input("usuario_rut", sql.VarChar, rut)
          .query(`
                SELECT p.talleres as limite_talleres
                FROM usuario u
                JOIN [plan] p ON u.plan_id = p.plan_id
                WHERE u.usuario_rut = @usuario_rut
            `);

      return result.recordset[0]?.limite_talleres || 0;
    } catch (error) {
      console.error("Error al obtener límite de talleres:", error);
      throw error;
    }
  }

  async getNumTalleresActuales(rut) {
    try {
      const pool = await connectToDatabase();
      const result = await pool
          .request()
          .input("usuario_rut", sql.VarChar, rut)
          .query(`
                SELECT COUNT(*) as total_talleres
                FROM taller
                WHERE usuario_rut = @usuario_rut
            `);

      return result.recordset[0]?.total_talleres || 0;
    } catch (error) {
      console.error("Error al obtener número de talleres:", error);
      throw error;
    }
  }

  async canCreateTaller(rut) {
    try {
      const limiteTalleres = await this.getLimitTalleres(rut);
      const talleresActuales = await this.getNumTalleresActuales(rut);

      return talleresActuales < limiteTalleres;
    } catch (error) {
      console.error("Error al verificar si puede crear taller:", error);
      throw error;
    }
  }

}

export default new UserModel();
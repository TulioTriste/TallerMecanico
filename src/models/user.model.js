import { createConnection } from "../bd.js";

class UserModel {
    constructor() {
      this.connection = null;
    }

    async connect() {
        if (!this.connection) {
          this.connection = await createConnection();
        }
        return this.connection;
      }
  
    async getAllUsers() {
      const conn = await this.connect();
      const [rows] = await conn.execute('SELECT * FROM usuarios');
      return rows;
    }
  
    async addUser(nombre, email, password, direccion, numero) {
        try {
            const conn = await this.connect();
            const [result] = await conn.execute('INSERT INTO usuarios (nombre, email, contrasena, direccion, numerotel) VALUES (?, ?, ?, ?, ?)', [nombre, email, password, direccion, numero]);
            //console.log('usuarios agregado con éxito:', result);
            return result;
        } catch (error) {
            console.error('Error al agregar el usuarios:', error);
        }
    }
  
    async getUserById(id) {
      const conn = await this.connect();
      const [rows] = await conn.execute('SELECT * FROM usuarios WHERE user_id = ?', [id]);
      return rows[0];
    }
  
    async getUserByEmail(email) {
      const conn = await this.connect();
      const [rows] = await conn.execute('SELECT * FROM usuarios WHERE email = ?', [email]);
      return rows[0];
    }
  
    async updateUser(id, nombre, email, password) {
      const conn = await this.connect();
      const result = await conn.execute('UPDATE usuarios SET nombre = ?, email = ?, contrasena = ? WHERE id = ?', [nombre, email, password, id]);
      return result;
    }
  
    async deleteUser(id) {
      const conn = await this.connect();
      const result = await conn.execute('DELETE FROM usuarios WHERE id = ?', [id]);
      return result;
    }
  }
  
  export default new UserModel();
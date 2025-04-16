import mysql from 'mysql2/promise';

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'Mapachisus2004',
    database: 'tallermecanico',
  };

let connection;

export const createConnection = async () => {
  if (!connection) {
    connection = await mysql.createConnection(dbConfig);
    console.log('Conexión a la base de datos establecida.');
  }
  return connection;
};
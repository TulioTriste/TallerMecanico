import sql from 'mssql';

const dbConfig = {
  user: 'administrador', // Usuario de tu base de datos
  password: '@GooD31510', // Contraseña de tu base de datos
  server: 'server-taller.database.windows.net', // Dirección del servidor (proporcionada por CloudCluster)
  database: 'SQLTaller', // Nombre de la base de datos
  port: 1433, // Puerto predeterminado para SQL Server
  options: {
    encrypt: true, // Habilitar cifrado si es necesario
    trustServerCertificate: true, // Usar solo si el certificado no es de confianza
  },
};

export const connectToDatabase = async () => {
  try {
    const pool = await sql.connect(dbConfig);
    console.log('Conexión exitosa a la base de datos');
    return pool;
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
    throw error;
  }
};

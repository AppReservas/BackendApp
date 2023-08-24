const { Client } = require('pg');

// Configura la conexión a la base de datos
const dbConnection = async () => {
    const client = new Client({
        user: 'kevinb',
        host: '18.212.115.131', // Cambia esto si tu base de datos no está en localhost
        database: 'appreservas',
        password: '123456',
        port: 5432, // Puerto por defecto de PostgreSQL
      });
      
      // Conéctate a la base de datos
       try {
              await client.connect();
              console.log('Conexión a la base de datos exitosa');
          } catch (error) {
              console.error('Error al conectar a la base de datos:', error);
              throw new Error('Error al iniciar la conexión a la base de datos');
          }      
};

module.exports = {
    dbConnection
};
  

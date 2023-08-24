// const { Schema, model } = require('mongoose');

// const RoleSchema = Schema({
//     rol: {
//         type: String,
//         required: [true, 'El rol es obligatorio']
//     }
// });


// module.exports = model( 'Role', RoleSchema );

const { Client } = require('pg');

class RoleModel {
  constructor() {
    this.client = new Client({
        user: 'kevinb',
        host: '18.212.115.131',
        database: 'appreservas',
        password: '123456',
        port: 5432,
    });

    this.client.connect();
  }

  async crear(rol) {
    try {
      const consulta = `
        INSERT INTO roles (rol)
        VALUES ($1)
        RETURNING *`;
        
      const valores = [rol];
      
      const resultado = await this.client.query(consulta, valores);
      return resultado.rows[0];
    } catch (error) {
      throw error;
    }
    }
    async obtenerPorRol(rol) {
        try {
          const consulta = 'SELECT * FROM roles WHERE rol = $1';
          const valores = [rol];
    
          const resultado = await this.client.query(consulta, valores);
          return resultado.rows[0];
        } catch (error) {
          throw error;
        }
      }
  

  // Otros métodos como obtenerPorRol, actualizar, eliminar, etc.
}

module.exports = RoleModel ;

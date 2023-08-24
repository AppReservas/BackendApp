
// const { Schema, model } = require('mongoose');

// const UsuarioSchema = Schema({
//     nombre: {
//         type: String,
//         required: [true, 'El nombre es obligatorio']
//     },
//     correo: {
//         type: String,
//         required: [true, 'El correo es obligatorio'],
//         unique: true
//     },
//     password: {
//         type: String,
//         required: [true, 'La contraseña es obligatoria'],
//     },
//     img: {
//         type: String,
//     },
//     rol: {
//         type: String,
//         required: true,
//         default: 'USER_ROLE',
//         enum: ['ADMIN_ROLE', 'USER_ROLE']
//     },
//     estado: {
//         type: Boolean,
//         default: true
//     },
//     google: {
//         type: Boolean,
//         default: false
//     },
// });



// UsuarioSchema.methods.toJSON = function() {
//     const { __v, password, _id, ...usuario  } = this.toObject();
//     usuario.uid = _id;
//     return usuario;
// }

// module.exports = model( 'Usuario', UsuarioSchema );

const { Client } = require('pg');

class UsuarioModel {
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

  async crear(usuario) {
    try {
      const consulta = `
        INSERT INTO usuarios (nombre, correo, password, img, rol_id, estado, google)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *`;
        
      const valores = [
        usuario.nombre,
        usuario.correo,
        usuario.password,
        usuario.img,
        usuario.rol_id || 'USER_ROLE',
        usuario.estado || true,
        usuario.google || false
      ];

      const resultado = await this.client.query(consulta, valores);
      return resultado.rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Otros métodos como obtenerPorCorreo, actualizar, eliminar, etc.
}

module.exports = UsuarioModel;

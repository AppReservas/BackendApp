const { crearEstablecimiento, obtenerEstablecimientos, obtenerEstablecimiento, actualizarEstablecimiento, borrarEstablecimiento } = require('../controllers/establecimientos');

// Mock de modelo Establecimiento
const Establecimiento = require('../models/establecimiento'); // Asegúrate de tener un modelo Establecimiento en tu proyecto

jest.mock('../models/establecimiento');

// Mock de una solicitud (req) y una respuesta (res)
const req = {
  query: {
    limite: 5,
    desde: 0
  },
  params: {},
  body: {
    telefono: '101012'
  },
  usuario: {
    _id: '1' // Asegúrate de tener un ID de usuario válido en tu base de datos para esta prueba
  }
};
const res = {
  json: jest.fn(),
  status: jest.fn().mockReturnThis()
};

// Prueba para la función de obtenerEstablecimientos
test.only('Obtener establecimientos devuelve una lista de establecimientos', async () => {
  const establecimientosMock = [{ nombre: 'Establecimiento1' }, { nombre: 'Establecimiento2' }];
  Establecimiento.countDocuments.mockResolvedValue(establecimientosMock.length);
  Establecimiento.find.mockResolvedValue(establecimientosMock);

  await obtenerEstablecimientos(req, res);

  expect(res.json).toHaveBeenCalledWith({
    total: establecimientosMock.length,
    establecimientos: establecimientosMock
  });
});

// Prueba para la función de obtenerEstablecimiento
test.only('Obtener un establecimiento devuelve un establecimiento', async () => {
  const id = '2'; // Asegúrate de tener un ID válido en tu base de datos para esta prueba
  req.params.id = id;

  const establecimientoMock = { _id: id, nombre: 'Establecimiento1' };
  Establecimiento.findById.mockResolvedValue(establecimientoMock);

  await obtenerEstablecimiento(req, res);

  expect(res.json).toHaveBeenCalledWith(establecimientoMock);
});

// Prueba para la función de crearEstablecimiento
test.only('Crear establecimiento devuelve un establecimiento creado', async () => {
  const establecimientoData = {
    nombre: 'Nuevo Establecimiento',
    direccion: 'Dirección del Nuevo Establecimiento',
    telefono: '1234567890',
    usuario: req.usuario._id
  };
  req.body = establecimientoData;

  const establecimientoMock = { _id: '1', ...establecimientoData };
  Establecimiento.findOne.mockResolvedValue(null);
  Establecimiento.create.mockResolvedValue(establecimientoMock);

  await crearEstablecimiento(req, res);

  expect(res.status).toHaveBeenCalledWith(201);
  expect(res.json).toHaveBeenCalledWith(establecimientoMock);
});

// Prueba para la función de actualizarEstablecimiento
test('Actualizar establecimiento devuelve un establecimiento actualizado', async () => {
  const id = '1'; // Asegúrate de tener un ID válido en tu base de datos para esta prueba
  req.params.id = id;

  const establecimientoData = {
    nombre: 'Establecimiento Actualizado',
    direccion: 'Nueva Dirección',
    telefono: '0987654321'
  };
  req.body = establecimientoData;

  const establecimientoMock = { _id: id, ...establecimientoData };
  Establecimiento.findByIdAndUpdate.mockResolvedValue(establecimientoMock);

  await actualizarEstablecimiento(req, res);

  expect(res.json).toHaveBeenCalledWith(establecimientoMock);
});

// Prueba para la función de borrarEstablecimiento
test.only('Borrar establecimiento devuelve un establecimiento eliminado', async () => {
  const id = '1'; // Asegúrate de tener un ID válido en tu base de datos para esta prueba
  req.params.id = id;

  const establecimientoMock = { _id: id, estado: false };
  Establecimiento.findByIdAndUpdate.mockResolvedValue(establecimientoMock);

  await borrarEstablecimiento(req, res);

  expect(res.json).toHaveBeenCalledWith(establecimientoMock);
});

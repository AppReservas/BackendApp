const { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria, borrarCategoria } = require('../controllers/categorias');

const Categoria = require('../models/categoria');


jest.mock('../models/categoria');

// Simulación de una solicitud (req) y una respuesta (res)
const req = {
  query: {
    limite: 5,
    desde: 0
  },
  params: {},
  body: {},
  usuario: {
    _id: '1'
  }
};
const res = {
  json: jest.fn(),
  status: jest.fn().mockReturnThis()
};

// Prueba para la función de obtenerCategorias
test('Obtener categorias devuelve una lista de categorias', async () => {
  const categoriasMock = [{ nombre: 'categoria1'}, {nombre: 'categoria2'}];
  Categoria.countDocuments.mockResolvedValue(categoriasMock.length);
  Categoria.find.mockResolvedValue(categoriasMock);

  await obtenerCategorias(req, res);

  expect(res.json).toHaveBeenCalledWith({
    total: categoriasMock.length,
    categorias: categoriasMock
  });
});

// Prueba para la función de obtenerCategoria
test('Obtener una categoria devuelve una categoria', async () => {
  const id = '1'; // Asegúrate de tener un ID válido en tu base de datos para esta prueba
  req.params.id = id;
  const categoriaMock = {_id: id, nombre: 'Categoria1111'};
  Categoria.findById.mockResolvedValue(categoriaMock);

  await obtenerCategoria(req, res);

  expect(res.json).toHaveBeenCalledWith(categoriaMock);
});

// Prueba para la función de crearCategoria
test('Crear categoria devuelve una categoria creada', async () => {
  const categoriaData = {
    nombre: 'Nuevo Establecimiento',
    direccion: 'Dirección del Nuevo Establecimiento',
    telefono: '1234567890',
    usuario: req.usuario._id // Asegúrate de tener un ID de usuario válido en tu base de datos para esta prueba
  };
  req.body = categoriaData;

  const categoriaMock = { _id: '1111', ...categoriaData };
  Categoria.findOne.mockResolvedValue(null);
  Categoria.create.mockResolvedValue(categoriaMock);

  await crearCategoria(req, res);

  expect(res.status).toHaveBeenCalledWith(201);
  expect(res.json).toHaveBeenCalledWith(categoriaMock);
});

// Prueba para la función de actualizarCategoria
test('Actualizar categoria devuelve una Categoria actualizada', async () => {
  const id = '1'; // Asegúrate de tener un ID válido en tu base de datos para esta prueba
  req.params.id = id;

  const categoriaData = {
    nombre: 'Categoria Actualizada',
    direccion: 'Nueva Dirección',
    telefono: '0987654321'
  };
  req.body = categoriaData;

  const categoriaMock = { _id: id, ...categoriaData };
  Categoria.findByIdAndUpdate.mockResolvedValue(categoriaMock);

  await actualizarCategoria(req, res);

  expect(res.json).toHaveBeenCalledWith(categoriaMock);
});

// Prueba para la función de borrarCategoria
test('Borrar establecimiento devuelve un establecimiento eliminado', async () => {
  const id = '1'; // Asegúrate de tener un ID válido en tu base de datos para esta prueba
  req.params.id = id;
  
  const categoriaMock = { _id: id, estado: false };
  Categoria.findByIdAndUpdate.mockResolvedValue(categoriaMock);

  await borrarCategoria(req, res);

  expect(res.json).toHaveBeenCalledWith(categoriaMock);
});

// Middleware (de ruta) validador de Id
const validateId = (req, res, next) => {
  const { id } = req.params;

  // Validamos que el id no sea un numero (la consulta podria fallar o generar un error en la BBDD)
  if (!id || isNaN(Number(id))) {
    return res.status(400).json({
      message: "El id del producto debe ser un numero valido",
    });
  }

  // Convertimos el parametro id a un numero entero (porque la url viene como string)
  req.id = parseInt(id, 10);

  console.log("Id validado: ", req.id);

  next();
};

export { validateId };

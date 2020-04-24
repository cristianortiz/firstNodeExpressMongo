//llamo las rutas creadas en /routes para cada controlador
const productsRoutes = require('./products-routes');
const usersRoutes = require('./users-routes');

//funcion flecha app que es una aplicacion de express, que combina las ruta creadas en una API
module.exports = (app) => {
  //puedo usar app.use porque se que app es una aplicacion de express
  app.use('/api/v1/users', usersRoutes);
  app.use('/api/v1/products', productsRoutes);
};

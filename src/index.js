const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); //permite obtener los parametros de una peticion POST
const dotenv = require('dotenv'); //incluyo paquete para variables de entorno

dotenv.config();

//importar las rutas creadas para la API v1 que se han conbinado en routes/index.js
const routesV1 = require('./routes/v1');
const app = express();

console.log('MONGO', process.env.MONGO);

app.use(bodyParser.urlencoded({ extended: false })); //body-parser con express para acceder a prametros POST
app.use(bodyParser.json()); //para que bodyparser procese json

routesV1(app);
//si no esta PORT definido en .env usar el puerto 4000
const PORT = process.env.PORT || 4000;

//conexion a una base de datos mongo db usando los datos de .env
mongoose
  .connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Conectado a mongoDB');
    app.listen(PORT, () => {
      console.log('Running on ' + PORT);
    });
  })
  .catch((error) => {
    console.log('error mongoDB', error);
  });

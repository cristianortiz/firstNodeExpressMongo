import express, { Application } from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

dotenv.config();
const routesV1 = require('./routes/v1');
const app: Application = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
routesV1(app);

//si no esta PORT definido en .env usar el puerto 4000, le decimos que PORT puede ser un number o string, para cumplir con el tipado TS
const PORT: number | string = process.env.PORT || 4000;

//conexion a una base de datos mongo db usando los datos de .env, MONGO! es para decir que siempre sera string en TS
mongoose
  .connect(process.env.MONGO!, {
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

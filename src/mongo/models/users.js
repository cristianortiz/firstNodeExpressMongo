const mongoose = require('mongoose');
//const Schema = mongoose.Schema; una forma de crear un schema o documento en mongo
const { Schema } = mongoose; //equivalente a la anterior

//definimos la estructura de datos para la coleccion users
const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },

  data: {
    type: { age: Number, isMale: Boolean },
  },
  role: { type: String, enum: ['admin', 'seller'], default: 'seller' },
});

const model = mongoose.model('users', userSchema);
module.exports = model;

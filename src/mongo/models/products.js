const mongoose = require('mongoose');
//const Schema = mongoose.Schema; una forma de crear un schema o documento en mongo
const { Schema } = mongoose; //equivalente a la anterior

/* definimos la estructura de datos para la coleccion products,agregamos 2do parametro timestamps que agrega
campos 'created at' y 'updated_at' */
const productSchema = new Schema(
  {
    title: { type: String, required: true },
    desc: { type: String, required: true },
    precio: { type: Number, required: true },
    images: { type: [{ type: String, require: true }], default: [] }, //si no hay imagen guardo lista vacia por defecto
    user: {
      /*como clave foranea SQL, relaciona un producto con el id de un user, si borrara un user,
      con este parametro puedo eliminar todos los productos asociados a el */
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const model = mongoose.model('products', productSchema);
module.exports = model;

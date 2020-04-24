const Products = require('../../mongo/models/products');

const createProduct = async (req, res) => {
  const { title, desc, precio, images, userId } = req.body;
  try {
    const product = await Products.create({
      title,
      desc,
      precio,
      images,
      user: userId,
    });
    res.send({ status: 'OK', data: product });
  } catch (error) {
    console.log('createProduct error', error);
    res.status(500).send({ status: 'ERROR', data: error.message });
  }
};

const getProducts = async (req, res) => {
  /* lista todos los elementos de la coleccion products en db, similar a un select *
  con populate('user')obtenemos los datos que queramos del id de usuario relacionado y con select()
   seleccionamos que datos de producto recupero*/
  try {
    const products = await Products.find({
      price: { $gt: 10 }, //filtramos productos con precios menoress a 10
    })
      .populate('user', 'username email')
      .select('title desc price');
    res.send({ status: 'OK', data: products });
  } catch (error) {
    console.log('error listando productos'.error);
    res.status(500).send({ status: 'ERROR', data: error.message });
  }
};

const getProductsByUser = async (req, res) => {
  try {
    //const userId = req.params.userID;
    const products = await Products.find({ user: req.params.userId });

    res.send({ status: 'OK', data: products });
  } catch (error) {
    console.log('error listando productos'.error);
    res.status(500).send({ status: 'ERROR', data: error.message });
  }
};

const deleteProduct = (req, res) => {};

//en este caso si exportamos objetos de user
module.exports = {
  createProduct,
  getProducts,
  getProductsByUser,
  deleteProduct,
};

const express = require('express');

//en routes/products definimos todas las rutas que se va a comunicar con el controlador v1/products
const productsController = require('../../controllers/v1/products-controller');

//enrutador para crear rutas post, que llaman a los metodos del controlador products
const router = express.Router();
router.post('/create', productsController.createProduct);
router.post('/delete', productsController.deleteProduct);
router.get('/get-all', productsController.getProducts);
router.get('/get-by-user/:userId', productsController.getProductsByUser); //obtiene los productos de un usuario especifico

module.exports = router; //se exporta router como funcion

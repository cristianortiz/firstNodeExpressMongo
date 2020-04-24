const express = require('express');

//en routes/users definimos todas las rutas que se va a comunicar con el controlador v1/users
const usersController = require('../../controllers/v1/users-controller');

//enrutador para crear rutas post, que llaman a los metodos del controlador users
const router = express.Router();
router.post('/create', usersController.createUsers);
router.post('/update', usersController.updateUser);
router.post('/delete', usersController.deleteUser);
router.get('/get-all', usersController.getUsers); //get, porque es solo consulta no modifica nada en BD

module.exports = router; //se exporta router como funcion

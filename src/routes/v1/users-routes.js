const express = require('express');
const { isAuth, isValidHostname, isAdmin } = require('../../middlewares/auth');

//en routes/users definimos todas las rutas que se va a comunicar con el controlador v1/users
const usersController = require('../../controllers/v1/users-controller');

//enrutador para crear rutas post, que llaman a los metodos del controlador users
const router = express.Router();
router.post('/login', usersController.login);
router.post('/create', usersController.createUsers);
router.post('/update', isValidHostname, isAuth, usersController.updateUser); //si el middleware isAuth valida al usuario, se ejecuta updateUser
router.post('/delete', isAuth, isAdmin, usersController.deleteUser);
router.get('/get-all', usersController.getUsers); //get, porque es solo consulta no modifica nada en BD

module.exports = router; //se exporta router como funcion

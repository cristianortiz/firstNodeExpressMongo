const Users = require('../../mongo/models/users');
const bcrypt = require('bcrypt'); //para encriptar la contraseña
/* 
/*encriptamos el parametro password  y con funcion flecha verificamos si hay un error
  coordinar la ejecucion del hash y la respuesta al user con codigo asincrono, ya que bcrypt.hash retorna una PROMESA
  y recogemos los errores con try catch  */
const createUsers = async (req, res) => {
  try {
    console.log('req.body', req.body);

    //ahora recogemos los datos desde una peticion POST
    const { username, email, password, data } = req.body;

    //hash para guardar la pass encryptada
    const hash = await bcrypt.hash(password, 15);

    //escribimos los datos de un nuevo usuario en mongodb
    /* await Users.create({
      username, //equivalente a username:username solo si el campo en DB es igual a la variable recogida desde req.body
      email,
      password: hash,
      data,
    }); */
    //otra forma de guardar datos en mongodb
    const user = new Users();
    user.username = username;
    user.email = email;
    user.password = hash;
    user.data = data;
    await user.save();

    res.send({ status: 'OK', message: 'user created' });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: 'ERROR', message: error.message });
  }
};
const deleteUser = (req, res) => {
  res.send({ status: 'OK', message: 'user deleted' });
};
const getUsers = (req, res) => {
  res.send({ status: 'OK', data: ['user1', 'user2'] });
};
const updateUser = (req, res) => {
  res.send({ status: 'OK', message: 'user updated' });
};

//en este caso si exportamos objetos de user
module.exports = { createUsers, deleteUser, getUsers, updateUser };

const Users = require('../../mongo/models/users');
const bcrypt = require('bcrypt'); //para encriptar la contraseña
const jwt = require('jsonwebtoken');
const expiresIn = 600; //tiempo de duracion del token jwt en segundos

//metodo autenticacion de usuario
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    //retorna el primer usuario que coincida con la busqueda
    const user = await Users.findOne({ email });

    //si el usuario existe retorno sus datos, de lo contrario mensaje de error
    if (user) {
      //comparamos la pass de la peticion con el hash almacenado en bd con bcrypt
      const isOk = await bcrypt.compare(password, user.password);
      if (isOk) {
        //genero un token con jwt para asegurar la sesion de usuario
        const token = jwt.sign(
          { userId: user._id, role: user.role },
          process.env.JWT_SECRET,
          { expiresIn }
        );
        res.send({ status: 'OK', data: { token, expiresIn } });
      } else {
        res.status(403).send({ status: 'INVALID_ACCESS', message: '' });
      }
    } else {
      res
        .status(401)
        .send({ status: 'USER_NOT_FOUND', message: 'no hay usuario' });
    }
  } catch (error) {
    res.status(500).send({ status: 'ERROR', message: error.message });
  }
};
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

//actualizacion info usuario con usando async await y trycatch
const updateUser = async (req, res) => {
  try {
    //recupero desde la peticion post los datos a actualizar junto con el id del usuario a editar
    const { username, email, data, userId } = req.body;

    //usando el objeto User actualizo directamente la coleccion user con el metodo findByIdAndUpdate
    await Users.findByIdAndUpdate(userId, { username });
    res.send({ status: 'OK', message: 'user updated' });
  } catch (error) {
    /*capturamos un posible error de campo duplicado ejemplo,'username' se definio
    como unique, no puede haber dos usuarios con el mismo username */
    if (error.code && error.code === 11000) {
      res.status(400).send({
        status: 'DUPLICATED_VALUES',
        message: error.keyValue,
      });
      return;
    }
    res.status(500).send({ status: 'ERROR', message: 'Error al editar' });
  }
};

//en este caso si exportamos objetos de user
module.exports = { createUsers, deleteUser, getUsers, updateUser, login };

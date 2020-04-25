/* metodos middleware para hacer validaciones a las peticiones http que llegan a la API REst
se ejecutan antes de llegar a los metodos en los controladores y solo los llaman al pasar las validaciones */

//valida si el hostname que hace la peticion esta dentre de una lista de hostnames predefinida
const jwt = require('jsonwebtoken');
const isValidHostname = (req, res, next) => {
  const validHosts = ['dina.ec', 'localhost'];

  if (validHosts.includes(req.hostname)) {
    //si pasa la validacion del middleware llama al metodo del controlador de la peticion POST o GET original
    next();
  } else {
    res.status(403).send({ status: 'ACCES_DENIED' });
  }
};
//valida que exista un token en la peticion http y que este sea un jwt de usuario valido
const isAuth = (req, res, next) => {
  try {
    const { token } = req.headers;

    //verifico que exista un token
    if (token) {
      //ahora que sea un jwt valido
      jwt.verify(token, process.env.JWT_SECRET);
      next();
    } else {
      //si no existe token lanzo excepcion 403
      throw {
        code: 403,
        status: 'ACCES_DENIED',
        message: 'Missing header token',
      };
    }
  } catch (error) {
    res
      .status(error.code || 500) //si existe algun codigo de error lo uso de lo contrario se usa code 500
      .send({ status: error.status || 'ERROR', message: error.message }); //si error trae un status usarlo, si no usar status=ERROR
  }
};

module.exports = { isValidHostname, isAuth };

const {uniqueError} = require("sequelize")

function logErrors(err, req, res, next) {
  console.error(err);
  next(err);
}

function uniqueDateErrorHandler(err, req, res, next) {
  res.status(409).json({
    message: err
  });
  // if (err instanceof uniqueError.) {
  //   res.status(409).json({
  //     message: "correo duplicado",
  //     stack: err.stack
  //   })
  // }
  //next(err);
}

function errorHandler(err, req, res, next) {
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
}

function boomErrorHandler(err, req, res, next) {
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  }
  next(err);
}


module.exports = { logErrors, errorHandler, boomErrorHandler, uniqueDateErrorHandler}

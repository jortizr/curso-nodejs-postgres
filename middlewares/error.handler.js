const { ValidationError, ForeignKeyConstraintError, DatabaseError } = require("sequelize");
const boom = require('@hapi/boom');
function logErrors(err, req, res, next) {
  console.error(err);
  next(err);
}

function ormErrorHandler(err, req, res, next) {

  if (err instanceof ValidationError) {
    throw boom.conflict(err.errors[0].message);
  }
  if (err instanceof ForeignKeyConstraintError ) {
    throw boom.notAcceptable(err);
  }
  if (err instanceof DatabaseError) {
    res.json({message:err.message});
  }

  next(err);
}

function errorHandler(err, req, res, next) {
  res.status(500).json({
    message: err.message,
    stack: err.stack
  });
}

function boomErrorHandler(err, req, res, next) {

  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  }
  next(err);
}


module.exports = { logErrors, errorHandler, boomErrorHandler, ormErrorHandler}

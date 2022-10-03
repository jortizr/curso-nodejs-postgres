const { User, UserSchema } = require("./user.model");

function setupModels(sequelize) {
  //el metodo init tiene que tener ese schema del user
  //se envia el metodo estatico q no require de invocacion
  User.init(UserSchema, User.config(sequelize));
}
module.exports = setupModels;
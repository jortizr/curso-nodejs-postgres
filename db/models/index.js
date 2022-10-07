const { User, UserSchema } = require("./user.model");
const { Customer, CustomerSchema } = require("./customer.model");

function setupModels(sequelize) {
  //el metodo init tiene que tener ese schema del user
  //se envia el metodo estatico q no require de invocacion
  User.init(UserSchema, User.config(sequelize));
  Customer.init(CustomerSchema, Customer.config(sequelize));
  Customer.associate(sequelize.models);
}
module.exports = setupModels;

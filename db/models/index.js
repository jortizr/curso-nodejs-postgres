const { User, UserSchema } = require("./user.model");
const { Customer, CustomerSchema } = require("./customer.model");
//cargamos los modelos
const { Product, ProductSchema } = require("./product.model");
const { Category, CategorySchema } = require("./category.model");

function setupModels(sequelize) {
  //el metodo init tiene que tener ese schema del user
  //se envia el metodo estatico q no require de invocacion
  User.init(UserSchema, User.config(sequelize));
  Customer.init(CustomerSchema, Customer.config(sequelize));

  //agregamos la inicializacion de los modelos
  Product.init(ProductSchema, Product.config(sequelize));
  Category.init(CategorySchema, Category.config(sequelize));

  User.associate(sequelize.models);
  Customer.associate(sequelize.models);
  Category.associate(sequelize.models);
  Product.associate(sequelize.models);
}
module.exports = setupModels;

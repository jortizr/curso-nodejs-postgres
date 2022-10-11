const { User, UserSchema } = require("./user.model");
const { Customer, CustomerSchema } = require("./customer.model");
//cargamos los modelos
const { Product, ProductSchema } = require("./product.model");
const { Category, CategorySchema } = require("./category.model");
//se llama al modelos para ser usado
const { Order, OrderSchema } = require("./order.model");

function setupModels(sequelize) {
  //el metodo init tiene que tener ese schema del user
  //se envia el metodo estatico q no require de invocacion
  User.init(UserSchema, User.config(sequelize));
  Customer.init(CustomerSchema, Customer.config(sequelize));

  //agregamos la inicializacion de los modelos
  Category.init(CategorySchema, Category.config(sequelize));
  Product.init(ProductSchema, Product.config(sequelize));
  //que inicialice la order con el schema y configuracion de seq
  Order.init(OrderSchema, Order.config(sequelize));

  User.associate(sequelize.models);
  Customer.associate(sequelize.models);
  Category.associate(sequelize.models);
  Product.associate(sequelize.models);
  //la tabla nueva order
  Order.associate(sequelize.models);
}
module.exports = setupModels;

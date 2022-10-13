const { Model, DataTypes, Sequelize } = require('sequelize');
const { CUSTOMER_TABLE} = require("./customer.model");

const ORDER_TABLE = 'orders';
const OrderSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: "create_at",
    defaultValue: Sequelize.NOW
  },
  customerId: {
    field: 'customer_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: CUSTOMER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }
};
class Order extends Model {

  static associate(models) {
    this.belongsTo(models.Customer,
      {
        as: 'customer'
      });
    //aqui le decimos que una orden tiene
    // this.belongsToMany(models.Product, {
    //   as: "items",//la asociacion seria items de compras
    //   through: models.OrderProduct, //definimos la join table
    //   foreignKey: "orderId", //le definimos la fk de order
    //   otherKey: "productId"//le decimos la otra fk de product
    // });
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: ORDER_TABLE,
      modelName: 'Order',
      timestamps: false,
    };
  }
}
module.exports = { Order, OrderSchema, ORDER_TABLE };

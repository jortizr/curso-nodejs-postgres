const boom = require('@hapi/boom');

const {models} = require("../libs/sequelize")
class OrderService {

  constructor(){
  }
  async create(data) {
    const newOrder = await models.Order.create(data);
    return newOrder;
  }

  async addItem(data) {
    const newItem = await models.OrderProduct.create(data);
    return newItem;
  }

  async find() {
    const orders = await models.Order.findAll();
    return orders;
  }

  async findOne(id) {
    const orderId = await models.Order.findByPk(id, {
      include: [
        {
          association: "customer",
          include: ["user"]
        }
        // "items"
      ] 
    });
    if (!orderId) {
      throw boom.notFound('product not found');
    }
    if (orderId.isBlock) {
      throw boom.conflict('product is block');
    }
    return orderId;
  }

  async update(id, changes) {
    return {
      id,
      changes,
    };
  }

  async delete(id) {
    return { id };
  }

}

module.exports = OrderService;

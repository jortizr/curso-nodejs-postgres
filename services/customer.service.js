const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class CustomerService {
  constructor() {}

  async create(data) {
    const newUser = await models.User.create(data.user);
    const newCustomer = await models.Customer.create({
      ...data,
      userId: newUser.id
    });
    return newCustomer;
  }

  async find() {
    const customers = await models.Customer.findAll({
      include: ["user"]
    });
    return customers;
  }

  async findOne(id) {
    const customer = await models.Customer.findByPk(id);
    if (!customer) {
      throw boom.notFound('user not found');
    }
    return { customer };
  }

  async update(id, changes) {
    const customerUpdate = await this.findOne(id);
    await models.Customer.update(changes, { where: { id } });
    return customerUpdate;
  }

  async delete(id) {
    const deleteCustomer = await this.findOne(id);
    await models.Customer.destroy({ where: { id } });
    return deleteCustomer;
  }
}

module.exports = CustomerService;

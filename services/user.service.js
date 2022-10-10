const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
class UserService {
  constructor() {}

  async create(data) {
    const newUser = await models.User.create(data);
    return newUser;
  }

  async find() {
    const resp = await models.User.findAll({
      include: ["customer"]
    });
    return resp;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id);
    if (!user) {
      throw boom.notFound('user not found');
    }
    return { user };
  }

  async update(id, changes) {
    const userUpdate = await this.findOne(id);
    await models.User.update(changes, { where: { id } });
    return userUpdate;
  }

  async delete(id) {
    const deleteUser = await this.findOne(id);
    await models.User.destroy({ where: { id } });
    return deleteUser;
  }
}

module.exports = UserService;

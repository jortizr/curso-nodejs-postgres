const boom = require('@hapi/boom');

const { models } = require("../libs/sequelize");
class CategoryService {

  constructor() {
  }
  async create(data) {
    const newCategory = await models.Category.create(data);
    return newCategory;
  }

  async find() {
    const categories = await models.Category.findAll();
    return categories;
  }

  async findOne(id) {
    const category = await models.Category.findByPk(id, {
      include: ["products"]
    } );
    if (!category) {
      throw boom.notFound('user not found');
    }
    return category;
  }

  async update(id, changes) {
    const updateCategory = await this.findOne(id);
    await models.Category.update(changes, { where: { id } });
    return updateCategory;
  }

  async delete(id) {
    const deleteCategory = await this.findOne(id);
    await models.Category.destroy({ where: { id } });
    return deleteCategory;
  }
}
module.exports = CategoryService;

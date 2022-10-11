const boom = require('@hapi/boom');
const { models } = require("../libs/sequelize");
class ProductsService {

  constructor(){}

  async create(data) {
    const newProduct = await models.Product.create(data);
    return newProduct;
  }

  async find() {
    const products = await models.Product.findAll({
      include: ["category"]
    });
    return products;
  }

  async findOne(id) {
    const product = await models.Products.findByPk(id);
    if (!product) {
      throw boom.notFound('product not found');
    }
    if (product.isBlock) {
      throw boom.conflict('product is block');
    }
    return product;
  }

  async update(id, changes) {
    const updateProduct = await this.findOne(id);
    await models.Product.update(changes, {where: {id}})
    if (!updateProduct) {
      throw boom.notFound('product not found');
    }
    return updateProduct;
  }

  async delete(id) {
    const deleteProduct = await this.findOne(id);
    await models.Product.destroy({ where: { id } });
    return deleteProduct;
  }
}

module.exports = ProductsService;

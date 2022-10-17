const boom = require('@hapi/boom');
const { models } = require("../libs/sequelize");
const {Op} = require('sequelize');
class ProductsService {

  constructor(){}

  async create(data) {
    const newProduct = await models.Product.create(data);
    return newProduct;
  }

  async find(query) {
    const options = {
      include: ["category"],
      where: {}
    }
    const { limit, offset } = query;
    if (limit && offset) {
      options.limit = limit;
      options.offset = offset;
    }

    const { price } = query;
    if (price) {
      options.where.price = price;
    }

    const { price_min, price_max } = query;
    if (price_min && price_max) {
      options.where.price = {//como el price no es exacto se
        //envia un array para hacer que funcione el operador
        //mayor y menor que en la DB
        [Op.gte]: price_min,
        [Op.lte]: price_max,
      };
    }

    const products = await models.Product.findAll(options);
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

const { Sequelize } = require("sequelize");
const { config } = require("../config/config");
const setupModels = require("../db/models");
//desde config ya se trae toda la url sin necesidad de hacer un if

const options = {
  dialect: "postgres",
  logging: config.isProd ? false:true,
}

if (config.isProd) {
  options.ssl = {
    ssl:{//esto si debe correr solo en produccion
      rejectUnauthorized: false
    }
  }
}

const sequelize = new Sequelize(config.dbUrl, options);

setupModels(sequelize);

module.exports = sequelize;

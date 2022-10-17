const { Pool } = require('pg');
const { config } = require('../config/config');

let URI = ''; //modificable

if (config.isProd) {//evaluamos si esta en produccion
  URI = config.dbUrl;
} else {//sino usamos el docker de desarrollo
  const USER = encodeURIComponent(config.dbUser);
  const PASSWORD = encodeURIComponent(config.dbPassword);
  URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

}
const pool = new Pool({ connectionString: URI });
module.exports = pool;

const dev = {
  app: {
    port: process.env.DEV_APP_PORT || 3052,
  },

  db: {
    host: process.env.DEV_APP_PORT || 'localhost',
    port: process.env.DEV_APP_PORT || 27017,
    name: process.env.DEV_APP_PORT || 'shopDev',
  },
};

const prod = {
  app: {
    port: process.env.PROD_APP_PORT || 3052,
  },

  db: {
    host: process.env.PROD_APP_PORT || 'localhost',
    port: process.env.PROD_APP_PORT || 27017,
    name: process.env.PROD_APP_PORT || 'shopProd',
  },
};

const config = { dev, prod };

const env = process.env.NODE_ENV || 'dev';

console.log(config[env], env);
module.exports = config[env];

const Sequelize = require('sequelize');
require('dotenv').config({ path: './process.env'});

const sequelize = new Sequelize( process.env.DB, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  port: process.env.DB_PORT
})

sequelize.authenticate()
  .then(() => console.log('Connected to DgB'))
  .catch((err) => console.log(`Error: ${err}`));

module.exports = { sequelize, Sequelize };

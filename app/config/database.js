const { Sequelize } = require('sequelize');
const { DATABASE_NAME, DATABASE_USER, DATABASE_PASS, DATABASE_URL } = process.env;

// console.log(DATABASE_NAME, DATABASE_USER, DATABASE_PASS, DATABASE_URL);

const sequelize = new Sequelize("db-test", "man", "aA0840454897", {
  host: "postgresql-88714-0.cloudclusters.net",
  dialect: 'postgres',
  port: '10742'
});

module.exports = sequelize

try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}
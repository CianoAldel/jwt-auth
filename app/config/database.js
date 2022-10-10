const { Sequelize } = require('sequelize');
const { DATABASE_NAME, DATABASE_USER, DATABASE_PASS, DATABASE_URL } = process.env;

// console.log(DATABASE_NAME, DATABASE_USER, DATABASE_PASS, DATABASE_URL);

const sequelize = new Sequelize("test_jwt", "postgres", "aA0840454897", {
  host: "localhost",
  dialect: 'postgres',
  port: '5432'
});

module.exports = sequelize

try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}
require('dotenv').config();
const { DB_HOST, DB_USERNAME, DB_PASSWORD } = process.env;
console.log(DB_PASSWORD);
module.exports = {
  "development": {
    "username": DB_USERNAME,
    "password": DB_PASSWORD,
    "database": "mifi_test",
    "host": DB_HOST,
    "dialect": "postgres"
  },
  "test": {
    "username": DB_USERNAME,
    "password": DB_PASSWORD,
    "database": "mifi_test",
    "host": DB_HOST,
    "dialect": "postgres"
  },
  "production": {
    "username": DB_USERNAME,
    "password": DB_PASSWORD,
    "database": "mifi_db",
    "host": DB_HOST,
    "dialect": "postgres"
  }
}

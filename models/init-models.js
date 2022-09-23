var DataTypes = require("sequelize").DataTypes;
var _tb_article = require("./tb_article");
var _tb_user = require("./tb_user");

function initModels(sequelize) {
  var tb_article = _tb_article(sequelize, DataTypes);
  var tb_user = _tb_user(sequelize, DataTypes);

  tb_article.belongsTo(tb_user, { as: "user", foreignKey: "user_id"});
  tb_user.hasMany(tb_article, { as: "tb_articles", foreignKey: "user_id"});

  return {
    tb_article,
    tb_user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;

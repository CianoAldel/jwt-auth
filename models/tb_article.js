const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tb_article', {
    article_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'tb_user',
        key: 'user_id'
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'tb_article',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "tb_article_pkey",
        unique: true,
        fields: [
          { name: "article_id" },
        ]
      },
    ]
  });
};

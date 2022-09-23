const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tb_user_login', {
    login_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    login_time: {
      type: DataTypes.STRING,
      allowNull: true
    },
    expire_time: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'tb_user_login',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "tb_user_login_pkey",
        unique: true,
        fields: [
          { name: "login_id" },
        ]
      },
    ]
  });
};

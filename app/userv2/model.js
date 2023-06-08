const sequelize = require('../../config/sequelize');
const {DataTypes} = require('sequelize');

const User = sequelize.define(
  'User',
  {
    UserID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    CompanyID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    Name: {
        type: DataTypes.STRING,
    },
    Email: {
        type: DataTypes.STRING,
    },
    Username: {
        type: DataTypes.STRING,
    },
    Password: {
        type: DataTypes.STRING,
    },
    Image: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
  },
  {
    // Other model options go here
  },
);

module.exports = User;

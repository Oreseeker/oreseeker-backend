const sequelize = require('../database')
const { DataTypes, Model } = require('sequelize');

class Images extends Model {

}

Images.init({
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
}, {
  sequelize
});

module.exports = Images;

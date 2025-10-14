const { sequelize } = require('../database');
const { DataTypes, Model } = require('sequelize');

class Image extends Model {

}

Image.init({
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
}, {
  sequelize
});

module.exports = Image;

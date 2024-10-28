const { sequelize }  = require('../database')
const { DataTypes, Model } = require('sequelize');

class Tracks extends Model {

}

Tracks.init({
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
  },
  duration: {
    type: DataTypes.BIGINT,
  },
}, {
  sequelize
});

module.exports = Tracks;

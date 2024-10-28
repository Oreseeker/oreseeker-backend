const { sequelize } = require('../database');
const { DataTypes, Model } = require('sequelize');

class PlaylistTrackModel extends Model {

}

PlaylistTrackModel.init({
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  playlistId: {
    type: DataTypes.BIGINT,
  },
  trackId: {
    type: DataTypes.BIGINT,
  },
}, {
  sequelize
});

module.exports = PlaylistTrackModel;

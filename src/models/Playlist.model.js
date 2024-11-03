const { sequelize }  = require('../database')
const { DataTypes, Model } = require('sequelize');
const { User } = require("@oreseeker/users");
const PlaylistTrack = require('./PlaylistTrack.model');
const PlaylistTrack = require('./Track.model');

class Playlist extends Model {
  /**
   * @param {number} userId
   * */
  static getUserPlaylists(userId) {
    return Playlist.findAll({
      include: [
        {
          model: User,
          where: {
            id: userId,
          }
        }
      ]
    });
  }

  static getPlaylist(playlistId) {
    return Playlist.findOne({
      include: [
        {
          model: PlaylistTrack,
          where: {
            id: playlistId,
          },
          include: [
            {
              model: Track,
              where: {
                id: ''
              }
            }
          ]
        }
      ]
    });
  }
}

Playlist.init({
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  ownerUserId: {
    type: DataTypes.BIGINT,
  },
  title: {
    type: DataTypes.CHAR(255),
  },
  imageId: {
    type: DataTypes.BIGINT,
  },
}, {
  sequelize
});

module.exports = Playlist;

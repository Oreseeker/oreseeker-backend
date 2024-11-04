const { sequelize }  = require('../database')
const { DataTypes, Model, where} = require('sequelize');
const { User } = require("@oreseeker/users");
const Track = require('./Track.model');

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
            id: userId
          }
        }
      ]
    });
  }

  static getPlaylist(playlistId) {
    return Playlist.findOne({
      where: {
        id: playlistId,
        include: [
          Track,
        ]
      }
    });
  }

  static getNumberOfUserPlaylists(userId) {
    return Playlist.count({
      where: {
        ownerUserId: userId,
      }
    });
  }

  static updatePlaylist(playlistId, { title }) {
    return Playlist.update(
    {
      title,
    },
    {
      where: {
        id: playlistId
      }
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

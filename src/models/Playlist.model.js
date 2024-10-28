const { sequelize }  = require('../database')
const { DataTypes, Model } = require('sequelize');
const { User } = require("@oreseeker/users");

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

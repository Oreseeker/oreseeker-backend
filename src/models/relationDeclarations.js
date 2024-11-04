const { User } = require('@oreseeker/users');
const Image = require('./Image.model');
const Playlist = require('./Playlist.model');
const Track = require('./Track.model');

Playlist.belongsTo(User, {
  foreignKey: 'ownerUserId',
  targetKey: 'id'
});

Image.hasOne(Playlist, {
  foreignKey: 'imageId',
  targetKey: 'id'
});

Track.belongsToMany(Playlist, {
  through: 'playlist_track',
  sourceKey: 'id',
  targetKey: 'id'
});

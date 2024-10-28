const { User } = require('@oreseeker/users');
const Image = require('./Image.model');
const Playlist = require('./Playlist.model');
const PlaylistTrack = require('./PlaylistTrack.model');
const Track = require('./Track.model');

User.hasMany(Playlist, {
  foreignKey: 'ownerId',
  targetKey: 'id'
});

Image.hasOne(Playlist, {
  foreignKey: 'imageId',
  targetKey: 'id'
});

Track.hasMany(PlaylistTrack, {
  foreignKey: 'trackId',
  targetKey: 'id',
});

Playlist.hasMany(PlaylistTrack, {
  foreignKey: 'playlistId',
  targetKey: 'id',
})

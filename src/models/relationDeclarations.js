const { Users } = require('@oreseeker/users');
const Playlists = require('./Playlists.model');

Users.hasMany(Playlists, {
  foreignKey: 'ownerId',
  targetKey: 'id'
});

Images.hasOne(Playlists, {
  foreignKey: 'imageId',
  targetKey: 'id'
});

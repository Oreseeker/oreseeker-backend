const { sequelize } = require('../database');
require('./PlaylistTrack.model');
require('./Image.model');
require('./Track.model');
require('./Playlist.model');
require('./relationDeclarations');

sequelize.sync();

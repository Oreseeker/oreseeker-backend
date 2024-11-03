const { getCookies } = require('../utils/cookies');
const Playlist = require('../models/Playlist.model');


module.exports = async (req, res, next) => {
  const cookies = getCookies(req);

  const playlists = await Playlist.getUserPlaylists(cookies.userId);
  res.send(playlists);
}

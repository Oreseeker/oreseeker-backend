const { FREE_USER_PLAYLIST_LIMIT } = require('../../../server_config');
const cookies = require('../../utils/cookies');

const Playlist = require('../../models/Playlist.model');

module.exports = async function playlistCreateController(req, res, next) {
  const { userId } = cookies.getCookies(req);
  const { title } = req.body;

  const numberOfUserPlaylists = await Playlist.getNumberOfUserPlaylists(userId);

  if (numberOfUserPlaylists >= FREE_USER_PLAYLIST_LIMIT) {
    res.sendStatus(403);
    return;
  }

  const playlist = await Playlist.create({ title });

  res.status(201).send(playlist);
}

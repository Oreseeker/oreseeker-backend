const { getUserPlaylists } = require('./model');

async function getUserPlaylistsController(req, res, next) {
  const { userId } = req.body;
  const playlists = await getUserPlaylists(userId);
  res.send(playlists);
}

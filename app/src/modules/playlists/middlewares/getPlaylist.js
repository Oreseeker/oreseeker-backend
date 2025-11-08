async function getPlaylistController(req, res, next) {
  const { playlistId } = req.body;
  const playlist = await getPlaylist(playlistId);
  res.send(playlist);
}

module.exports = getPlaylistController;

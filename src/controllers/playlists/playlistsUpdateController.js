const Playlist = require('../../models/Playlist.model');

module.exports = async function playlistsUpdateController(req, res, next) {
  const { playlistId, title } = req.body;

  const updatedPlaylist = Playlist.updatePlaylist(playlistId, { title })

  res.send(updatedPlaylist);
}

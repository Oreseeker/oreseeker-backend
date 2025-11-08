async function createPlaylistController(req, res, next) {
  const title = req.body.title;
  await createPlaylist({ title, imageId });
  
  res.sendStatus(200);
}

module.exports = createPlaylistMiddleWare;

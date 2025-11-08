function createPlaylistValidator(req, res, next) {
  const title = req.body.title;

  if (!title) {
    res.status(400).send({ message: 'Field "title" is missing' });
  }

  next();
}

function getPlaylistValidator(req, res, next) {
  const { playlistId } = req.body;

  if (isNaN(+playlistId)) {
    res.sendStatus(400);
    return;
  }

  next();
}

module.exports = {
  createPlaylistValidator,
  getPlaylistController,
}

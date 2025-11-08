const express = require('express');
const router = express.Router();


const { createPlaylistValidator } = require('./validators.js');
const createPlaylistController = require('./middlewares/createPlaylist.js');
const getUserPlaylistsController = require('./middlewares/getPlaylists.js');

router.get('/', getUserPlaylistsController);
router.post('/', createPlaylistValidator, createPlaylistController);

module.exports = router;

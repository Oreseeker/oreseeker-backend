const express = require('express');
const playlistsLoadController = require('../controllers/playlists/playlistsLoadController');
const playlistCreateController = require('../controllers/playlists/playlistCreateController');
const playlistsUpdateController = require('../controllers/playlists/playlistsUpdateController');

const router = express.Router();

router.get('/', playlistsLoadController);

router.post('/', playlistCreateController);

router.patch('/', playlistsUpdateController);

module.exports = router;

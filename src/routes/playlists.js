const express = require('express');
const playlistsLoadController = require('../controllers/playlistsLoadController');

const router = express.Router();

router.get('/', playlistsLoadController);

module.exports = router;

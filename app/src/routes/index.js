const express = require('express');
const { authenticationValidator } = load('@/modules/users/validators.js');
const { router: userRouter } = load('@/modules/users');
const { router: playlistsRouter } = require('../modules/playlists');

const router = express.Router({ mergeParams: true });

router.use('/api/users', userRouter);
router.use('/api/v1/playlists', authenticationValidator, playlistsRouter);

module.exports = router;


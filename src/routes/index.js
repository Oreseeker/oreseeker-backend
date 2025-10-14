const express = require('express');
const { authenticationValidator } = load('@/modules/users/validators.js');
const { router: userRouter } = load('@/modules/users');
//const playlistsRouter = require('./playlists');

const router = express.Router({ mergeParams: true });

router.use('/api/users', userRouter);
//router.use('/api/playlists', authenticationValidator, playlistsRouter);

module.exports = router;


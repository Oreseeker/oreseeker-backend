const express = require('express');
const { authenticationValidator } = require('@oreseeker/users')
const { router: userRouter } = load('@/modules/users');
//const playlistsRouter = require('./playlists');

const router = express.Router({ mergeParams: true });

router.use('/api/users', userRouter);
//router.use('/api/playlists', authenticationValidator, playlistsRouter);

module.exports = router;


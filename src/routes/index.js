const express = require('express');
const { router: userRouter } = require('@oreseeker/users');
const router = express.Router({ mergeParams: true });

router.use('/api/user', userRouter);

module.exports = router;


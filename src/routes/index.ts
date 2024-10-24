import express = require('express');
import {userRouter} from './user';

export const router = express.Router({ mergeParams: true });

router.use('/api/users', userRouter);

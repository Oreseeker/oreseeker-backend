import express = require('express');
import {registrationController} from '../controllers/registrationController';
import {loginController} from '../controllers/loginController';
import {profileController} from '../controllers/profileController';

export const userRouter = express.Router();

userRouter.post('/regiser', registrationController);

userRouter.post('/log-in', loginController);

userRouter.get('/profile', profileController);

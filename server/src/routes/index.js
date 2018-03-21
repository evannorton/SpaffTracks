import { Router } from 'express';
import { isLoggedIn, tokenMiddleware } from '../middleware/auth.mw';

import authRouter from './auth';
import donationsRouter from './donations';
import usersRouter from './users';
import yearsRouter from './years';
import showsRouter from './shows';
import tracksRouter from './tracks';

let router = Router();

router.use('/auth', authRouter);
router.use('/donate', donationsRouter);

router.route('*')
    .post(tokenMiddleware, isLoggedIn)
    .put(tokenMiddleware, isLoggedIn)
    .delete(tokenMiddleware, isLoggedIn);

router.use('/users', usersRouter);
router.use('/years', yearsRouter);
router.use('/shows', showsRouter);
router.use('/tracks', tracksRouter);

export default router;
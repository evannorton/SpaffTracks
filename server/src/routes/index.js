import { Router } from 'express';;
import { isLoggedIn, tokenMiddleware } from '../middleware/auth.mw';

import authRouter from './auth';
import donationsRouter from './donations';
import usersRouter from './users';
import yearsRouter from './years';

let router = Router();

router.use('/auth', authRouter);
router.use('/donate', donationsRouter);

router.route('*')
    .post(tokenMiddleware, isLoggedIn)
    .put(tokenMiddleware, isLoggedIn)
    .delete(tokenMiddleware, isLoggedIn);

router.use('/users', usersRouter);
router.use('/years', yearsRouter);

export default router;
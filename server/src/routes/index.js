import { Router } from 'express';
import peopleRouter from './people';
import classesRouter from './classes';
import authRouter from './auth';
import usersRouter from './users';
import stripeDonationsRouter from './stripeDonations';
import { isLoggedIn, tokenMiddleware } from '../middleware/auth.mw';

let router = Router();

router.use('/auth', authRouter);

router.use(tokenMiddleware);
router.use(isLoggedIn);

router.use('/classes', classesRouter);
router.use('/people', peopleRouter);
router.use('/users', usersRouter);
router.use('/donate', stripeDonationsRouter);

export default router;
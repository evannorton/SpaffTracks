import { Router } from 'express';

import yearsRouter from './years';
import showsRouter from './shows';
import tracksRouter from './tracks';

let router = Router();

router.use('/years', yearsRouter);
router.use('/shows', showsRouter);
router.use('/tracks', tracksRouter);

export default router;
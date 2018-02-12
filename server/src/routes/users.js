import { Router } from 'express';
import { isLoggedIn } from '../middleware/auth.mw';

let router = Router();

router.get('/me', isLoggedIn, (req, res) => {
    res.json(req.user);
});

export default router;
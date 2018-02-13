import { Router } from 'express';
import stripe from '../utils/stripeCharge'

let router = Router();

router.post('/donate', (req, res) => {
    let amount = Number(req.body.amount);
    stripe.charge(req.body.token, amount)
        .then((success) => {
            res.sendStatus(204);
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(500);
        });
});

export default router;
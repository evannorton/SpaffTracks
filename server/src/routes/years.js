import { Router } from 'express';
import { tokenMiddleware, isLoggedIn } from '../middleware/auth.mw';
import Table from '../table';

let router = Router();
let years = new Table("years");

router.get('/', (req, res) => {

    years.getYears()
        .then((years) => {
            res.send(years[0]);
        }).catch((err) => {
            console.log(err);
        });

});

export default router;
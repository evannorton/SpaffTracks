import { Router } from 'express';
import Table from '../table';

let router = Router();
let shows = new Table("shows");

router.get('/', (req, res) => {

    shows.getShows()
        .then((shows) => {
            res.send(shows);
        }).catch((err) => {
            console.log(err);
        });

});

router.get('/year/:year', (req, res) => {

    let year = req.params.year;

    shows.getShowsByYear(year)
        .then((shows) => {
            res.send(shows[0]);
        }).catch((err) => {
            console.log(err);
        });

});

export default router;
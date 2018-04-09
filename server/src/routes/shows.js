import { Router } from 'express';
import Table from '../table';

let router = Router();
let shows = new Table("shows");

//get all shows

router.get('/', (req, res) => {

    shows.getShows()
        .then((shows) => {
            res.send(shows);
        }).catch((err) => {
            console.log(err);
        });

});

//get shows by year

router.get('/year/:year', (req, res) => {

    let year = req.params.year;

    shows.getShowsByYear(year)
        .then((shows) => {
            res.send(shows[0]);
        }).catch((err) => {
            console.log(err);
        });

});

//get next show

router.get('/next/:date', (req, res) => {

    let date = req.params.date;

    shows.getNextShow(date)
        .then((show) => {
            res.send(show[0][0]);
        }).catch((err) => {
            console.log(err);
        });

});

//get previous show

router.get('/previous/:date', (req, res) => {

    let date = req.params.date;

    shows.getPreviousShow(date)
        .then((show) => {
            res.send(show[0][0]);
        }).catch((err) => {
            console.log(err);
        });

});

export default router;
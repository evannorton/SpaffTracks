import { Router } from 'express';
import Table from '../table';

let router = Router();
let shows = new Table("shows");

router.get('/', (req, res) => {

    shows.getAll()
        .then((shows) => {
            res.send(shows);
        }).catch((err) => {
            console.log(err);
        });

});

export default router;
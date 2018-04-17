import { Router } from 'express';
import Table from '../table';

let router = Router();
let tracks = new Table("tracks");

router.get('/', (req, res) => {

    tracks.getTracks()
        .then((tracks) => {
            res.send(tracks);
        }).catch((err) => {
            console.log(err);
        });

});

router.get('/show/:date', (req, res) => {

    let date = req.params.date;

    tracks.getTracksByShow(date)
        .then((tracks) => {
            tracks = tracks[0];
            let soundcheck = [];
            let set1 = [];
            let set2 = [];
            let set3 = [];
            let encore = [];
            for (let i = 0; i < tracks.length; i++) {
                if (tracks[i].set == 1) {
                    set1.push(tracks[i]);
                } else if (tracks[i].set == 2) {
                    set2.push(tracks[i]);
                } else if (tracks[i].set == 3) {
                    set3.push(tracks[i]);
                } else if (tracks[i].set == 'E') {
                    encore.push(tracks[i]);
                } else if (tracks[i].set == 'S') {
                    soundcheck.push(tracks[i]);
                }
            }
            tracks = {
                soundcheck,
                set1,
                set2,
                set3,
                encore
            }
            res.send(tracks);
        }).catch((err) => {
            console.log(err);
        });

});

export default router;
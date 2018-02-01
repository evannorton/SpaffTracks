import { join } from 'path';
import express from 'express';
import { configurePassport } from './config/passport';
import stateRouting from './middleware/routing.mw';

const CLIENT_PATH = join(__dirname, '../../client');

let app = express();

app.use(express.static(CLIENT_PATH));
app.use(express.json());

configurePassport(app);

let people = [
    {
        name: 'Jackson',
        age: 25
    },
    {
        name: 'Matt',
        age: 40
    }
];

app.get('/api/people', (req, res) => {
    res.json(people);
});

app.use(stateRouting);

let port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

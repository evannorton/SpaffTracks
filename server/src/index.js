import { join } from 'path';
import express from 'express';
import routes from './routes';
import stateRouting from './middleware/routing.mw';

const CLIENT_PATH = join(__dirname, '../../client');

let app = express();

app.use(express.static(CLIENT_PATH));
app.use(express.json());

app.use('/api', routes);

app.use(stateRouting);

let port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

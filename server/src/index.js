import { join } from 'path';
import express from 'express';
import routes from './routes';
import configurePassport from './config/passport';
import enforce from "express-sslify";

const CLIENT_PATH = join(__dirname, '../../client');

let app = express();

app.use(express.static(CLIENT_PATH));
app.use(express.json());

configurePassport(app);

app.use(enforce.HTTPS({ trustProtoHeader: true }));

app.use('/api', routes);

let port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

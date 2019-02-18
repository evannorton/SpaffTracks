import { join } from 'path';
import express from 'express';
import morgan from 'morgan';
import routes from './routes';
import stateRouting from './middleware/routing.mw';
import configurePassport from './config/passport';

const CLIENT_PATH = join(__dirname, '../../client');

let app = express();

app.use(morgan('dev'));
app.use(express.static(CLIENT_PATH));
app.use(express.json());

configurePassport(app);

app.use((req, res, next) => {
    let isCorrect = true;
    let url = req.protocol + '://' + req.get('host') + req.originalUrl;
    console.log(url);
    if (url.indexOf("http://") >= 0) {
        isCorrect = false;
        url = url.replace("http", "https");
    }
    if (url.indexOf("www.") >= 0) {
        isCorrect = false;
        url = url.replace("www.", "");
    }
    if (isCorrect) {
        next();
    } else {
        console.log(url);
        res.redirect(302, url);
    }
});

app.use('/api', routes);

let port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

import { join } from 'path';
import express from 'express';
import routes from './routes';

const CLIENT_PATH = join(__dirname, '../../client');

let app = express();

app.use(express.static(CLIENT_PATH));
app.use(express.json());

app.use('/api', routes);

app.get('/*', function (req, res) {
    res.sendFile(join(__dirname, "../../client/index.html"), function (err) {
        if (err) {
            res.status(500).send(err)
        }
    })
})

let port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

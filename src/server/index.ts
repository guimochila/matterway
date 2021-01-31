import express, { urlencoded, json } from 'express';
import cors from 'cors';
import { addRemoteObj, getRemoteObj } from './controllers/remoteObj';

/* Simple HTTP server with a REST API endpoint to share the remote obj */

const port = process.env.PORT || 8080;
const app = express();

app.use(urlencoded({ extended: true }));
app.use(json());
app.use(cors());

app.post('/remote', addRemoteObj);
app.get('/remote', getRemoteObj);

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

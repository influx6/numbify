import express from 'express';
import DataStore from 'nedb';
  
import logger from "morgan";
import path from "path";
import cors from "cors";

import registerHandler from './services';
import NumVerify from './services/numverify'
import InMemoryStore from './services/store'

const port = process.env.PORT || 3030;
const numVerifyToken = process.env.NUMVERIFY_TOKEN;

const appDir = path.join(__dirname, '../app/build');

const db = new DataStore();
const store = new InMemoryStore(db);
const api = new NumVerify(numVerifyToken);

const app = express();
app.use(cors());
app.use(logger(':method | :url | :status | bodyLength :res[content-length] | :response-time ms'));
app.use(express.json());

// Serve static files from the React app
app.use(express.static(appDir));

const router = express.Router();

// register handlers with router and set to /apu.
app.use('/api', registerHandler(store, api, router));

// The "catchall" handler: for any request that doesn't
// match one above, send back Reacts index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(appDir, 'index.html'));
});

app.listen(port, () => {
  console.log(`server is listening on ${port}`);
})


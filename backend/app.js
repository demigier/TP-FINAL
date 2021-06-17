import fs from "fs";
import path from "path";
import express, { json } from 'express';
import stockRouter from './routes/stock-router.js';
import auth from './routes/authentication.js';

const app = express();
app.use(json());

// const cors = require('cors');
import cors from 'cors';
app.use(cors());
app.options('*', cors());

app.use('/auth', auth);
app.use('/', stockRouter);

const puerto = 4000;
const server = app.listen(puerto, () => {
    console.log(`Server initialized on port ${server.address().port}`)
});
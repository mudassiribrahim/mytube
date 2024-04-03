import dotenv from 'dotenv';
import express from 'express';
import connectDb from './db/db-connection.js';
dotenv.config({
    patht: './env',
});

const app = express();
const port = process.env.PORT || 7000;

connectDb()
    .then(() => {
        app.listen(port, () => {
            console.log(`server is running on PORT ${port}}`);
        });
    })
    .catch((err) => {
        console.log('Mongo db connection error :', err);
    });

import dotenv from 'dotenv';
import connectDb from './db/db-connection.js';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRouter from './routes/users-route.js';
dotenv.config({
    patht: './env',
});

const app = express();

app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    })
);

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
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static('public'));
app.use(cookieParser());

app.use('/api/v1/users', userRouter);

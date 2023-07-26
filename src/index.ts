import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import mongoose from 'mongoose';
import cookieSession  from 'cookie-session';

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';

const app = express();
// Pour que express fasse confiance à nginx et qu'il sache qu'il est derrière un proxy
app.set('trust proxy', true);
app.use(json());
app.use(
    cookieSession({
        // pas besoin de chiffré car le JWT sera chiffré
        signed: false,
        // https uniquement
        secure: true
    })
)

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all('*', async (req, res) => {
    throw new NotFoundError();
});

app.use(errorHandler);

const start = async () => {
    try{
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
        console.log('Connected to MongoDB!')
    } catch (err){
        console.error(err)
    }
}

app.listen(3000, () => {
    console.log('Listening on port 3000!');
});

start();
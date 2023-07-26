import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
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
        // https uniquement quand on est en prod
        secure: process.env.NODE_ENV !== 'test'
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

export { app };
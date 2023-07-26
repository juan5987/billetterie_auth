import express, {Request, Response} from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../middlewares/validate-request';

const router = express.Router();

router.post('/api/users/signin', [
    body('email')
        .isEmail()
        .withMessage('Email invalide'),
    body('password')
        .trim()
        .notEmpty()
        .withMessage('Vous devez entrer un mot de passe')
],
validateRequest,
    (req:Request, res: Response) => {

    });

export { router as signinRouter };
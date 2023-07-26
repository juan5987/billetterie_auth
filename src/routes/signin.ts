import express, {Request, Response} from 'express';
import { body, validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/request-validation-error';

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
    (req:Request, res: Response) => {
        const errors = validationResult(req);


        if(!errors.isEmpty()){
            throw new RequestValidationError(errors.array());
        }
    });

export { router as signinRouter };
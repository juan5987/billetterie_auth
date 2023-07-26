import express, {Request, Response} from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { validateRequest } from '../middlewares/validate-request';
import { User } from '../models/user';
import { BadRequestError } from '../errors/bad-request-error';
import { Password } from '../services/password';

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
    async (req:Request, res: Response) => {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if(!existingUser) {
            throw new BadRequestError('Identifiants invalides');
        }

        const passwordsMatch = await Password.compare(existingUser.password, password);

        if(!passwordsMatch) {
            throw new BadRequestError('Identifiants invalides');
        } 

        // Generate JWT
        const userJwt = jwt.sign({
            id: existingUser.id,
            email: existingUser.email
        },
        process.env.JWT_KEY!
        );
    
        // Stocker le JWT dans la session
        req.session = {
            jwt: userJwt
        };
    
        res.status(200).send(existingUser);


    });

export { router as signinRouter };
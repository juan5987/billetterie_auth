import express, {Request, Response} from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { User } from '../models/user';
import { BadRequestError } from '../errors/bad-request-error';
import { validateRequest } from '../middlewares/validate-request';

const router = express.Router();

router.post('/api/users/signup', [
    body('email')
    .isEmail()
    .withMessage('Email invalide'),
    body('password')
    .trim()
    .isLength({ min: 8})
    .withMessage('Le mot de passe doit contenir au moins 8 caractères')
], 
validateRequest,
async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new BadRequestError('Cette adresse mail est déjà enregistrée');
    }

    const user = User.build({ email, password });
    await user.save();

    const userJwt = jwt.sign({
        id: user.id,
        email: user.email
    },
    process.env.JWT_KEY!
    );

    req.session = {
        jwt: userJwt
    };

    res.status(201).send(user);
});

export { router as signupRouter };
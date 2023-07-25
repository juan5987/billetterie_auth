import express, {Request, Response} from 'express';
import { body } from 'express-validator';

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
(req: Request, res: Response) => {
    const { email, password } = req.body;

    
});

export { router as signupRouter };
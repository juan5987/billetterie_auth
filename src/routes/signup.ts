import express, {Request, Response} from 'express';
import { body, validationResult } from 'express-validator';

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
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).send(errors.array());
    }

    const { email, password } = req.body;

    console.log("Creating user...");
    res.send({});
    
});

export { router as signupRouter };
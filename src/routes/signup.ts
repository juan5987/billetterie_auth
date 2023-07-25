import express, {Request, Response} from 'express';
import { body, validationResult } from 'express-validator';
import { DatabaseConnectionError } from '../errors/database-connection-error';
import { RequestValidationError } from '../errors/request-validation-error';

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
async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        throw new RequestValidationError(errors.array());
    }

    const { email, password } = req.body;

    console.log("Creating user...");
    throw new DatabaseConnectionError();

    res.send({});
    
});

export { router as signupRouter };
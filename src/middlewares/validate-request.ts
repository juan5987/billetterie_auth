import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/request-validation-error';

// Middleware pour valider les requêtes
export const validateRequest = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // On récupère les erreurs de la requête
    const errors = validationResult(req);

    // S'il y a des erreurs, on les lance
    if (!errors.isEmpty()) {
        throw new RequestValidationError(errors.array());
    }

    // Sinon, on passe au middleware suivant
    next();
}
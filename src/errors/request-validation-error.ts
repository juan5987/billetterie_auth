import { ValidationError } from "express-validator";


// création d'une sous classe de Error pour gérer les erreurs de validation de la requête
export class RequestValidationError extends Error {
    constructor(public errors: ValidationError[]) {
        super();

        // car nous étendons une classe native de Node
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }
}


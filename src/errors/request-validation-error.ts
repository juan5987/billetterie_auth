import { ValidationError } from "express-validator";


// création d'une sous classe de Error pour gérer les erreurs de validation de la requête
export class RequestValidationError extends Error {
    statusCode = 400;
    
    constructor(public errors: ValidationError[]) {
        super();

        // car nous étendons une classe native de Node
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }

    serializeErrors() {
        return this.errors.map(err => {
            if (err.type === 'field') {
                return { message: err.msg, field: err.path };
              }
        });
    }
}


import { CustomError } from "./custom-error";

// création d'une sous classe de Error pour gérer les erreurs de connexion à la base de données
export class DatabaseConnectionError extends CustomError {
    statusCode = 500;
    reason = 'Impossible de se connecter à la base de données';
    constructor( ) {
        super('Impossible de se connecter à la base de données');

        // car nous étendons une classe native de Node
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }

    serializeErrors() {
        return [
            { message: this.reason }
        ];
    }
}
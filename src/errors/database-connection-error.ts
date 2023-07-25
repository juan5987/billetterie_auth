// création d'une sous classe de Error pour gérer les erreurs de connexion à la base de données
export class DatabaseConnectionError extends Error {
    reason = 'Erreur de connexion à la base de données';
    constructor() {
        super();

        // car nous étendons une classe native de Node
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }
}
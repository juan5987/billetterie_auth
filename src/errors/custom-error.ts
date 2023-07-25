export abstract class CustomError extends Error {
    abstract statusCode: number;

    constructor(message: string) {
        super(message);

        // car nous étendons une classe native de Node
        Object.setPrototypeOf(this, CustomError.prototype);
    }

    abstract serializeErrors(): { message: string; field?: string }[];
}
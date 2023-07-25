import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
    err: Error, 
    req: Request, 
    res: Response, 
    next: NextFunction
    ) => {

    console.log('Une erreur est survenue ', err);

    res.status(400).send({
        message: err.message
    });
}
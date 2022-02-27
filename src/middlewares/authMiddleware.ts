import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export function validateAuth(req: Request, res: Response, next: NextFunction) {
    try {
        jwt.verify(`${req.headers._token}`, `${process.env.JWT_TOKEN_SECRET}`);
        next();
    } catch (err) {
        res.status(402).json({message: 'un-authorized user'});
    }
}
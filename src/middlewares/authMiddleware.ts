import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export function validateAuth(req: Request, res: Response, next: NextFunction) {
    try {
        jwt.verify(`${req.headers._token}`, `${process.env.JWT_TOKEN_SECRET}`);
        next();
    } catch (err) {
        return res.status(401).json({message: 'un-authorized user'});
    }
}
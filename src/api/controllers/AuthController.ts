import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { User as UserType } from '../types/User'; 

const authRouter = express.Router();
const userInstance = User.createObject() as User;

authRouter.post(
    '/login',
    async (req: Request, res: Response) => {
        const { username, password } = req.body;
        
        try {
            const user = await userInstance.authenticate(username, password);
            if ( !user ) {
                res.status(401).json({message: 'un-authorized user'});
            }
            const token = jwt.sign({user}, `${process.env.JWT_TOKEN_SECRET}`);
            res.status(200).json({token});
        } catch ( err ) {
            res.status(400).send(err);
        }
    }
);

authRouter.post(
    '/register',
    async (req: Request, res: Response) => {
        const { firstName, lastName, username, password } = req.body;
        
        try {
            const userDate: UserType = { firstName, lastName, username, password };
            await userInstance.validate(userDate);
            await userInstance.createUser(userDate);
            const user = await userInstance.create();
            const token = jwt.sign({user}, `${process.env.JWT_TOKEN_SECRET}`);
            res.status(200).json({user, token});
        } catch ( err ) {
            res.status(400).send(err);
        }
    }
);

export default authRouter;

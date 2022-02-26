import express, { Request, Response } from 'express';
import { User } from './../models/User'; 
import { User as UserType } from './../types/User'; 
import { RequiredParamsIdError } from '../../errors/RequiredParamsIdError';

const userRouter = express.Router();
const userInstance = User.createObject() as User;

userRouter.get(
    '/',
    async (req: Request, res: Response) => {
        const users = await userInstance.index();
        res.json(users);
    }
);

userRouter.get(
    '/:id',
    async (req: Request, res: Response) => {
        const id = req.params.id;
        if ( !id ) {
            res.send(new RequiredParamsIdError('users'));
        }

        try {
            const user = await userInstance.show(id);
            res.status(200).json(user);
        } catch ( err ) {
            res.status(400).send(err);
        }
    }
);

userRouter.post(
    '/',
    async (req: Request, res: Response) => {
        const { firstName, lastName, password } = req.body;
        
        try {
            const userDate: UserType = { firstName, lastName, password };
            await userInstance.validate(userDate);
            await userInstance.createUser(userDate);
            const user = await userInstance.create();
            res.status(200).json(user);
        } catch ( err ) {
            res.status(400).send(err);
        }
    }
);

export default userRouter;

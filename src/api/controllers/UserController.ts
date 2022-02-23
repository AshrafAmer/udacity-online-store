import express, {Request, Response} from 'express';
const userRouter = express.Router();
import { User } from './../models/User'; 

userRouter.get(
    '/',
    async (req: Request, res: Response) => {
        console.log('here');
        const users = await new User().index();
        res.json(users);
    }
);

export default userRouter;

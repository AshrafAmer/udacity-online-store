import express, { Request, Response, Application } from 'express';
import bodyParser from 'body-parser';
import userRouter from './api/controllers/UserController';
import cors from 'cors';

const app: Application = express();
const address: string = "0.0.0.0:3000";

app.use(cors());
app.use(bodyParser.json());

app.use('/users', userRouter);

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!');
})

app.listen(3000, function () {
    console.log(`starting app on: ${address}`);
});

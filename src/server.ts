import express, { Request, Response, Application } from 'express';
import bodyParser from 'body-parser';
import userRouter from './api/controllers/UserController';
import categoryRouter from './api/controllers/CategoryController';
import productRouter from './api/controllers/ProductController';
import orderRouter from './api/controllers/OrderController';
import authRouter from './api/controllers/AuthController';
import cors from 'cors';

const app: Application = express();
const address: string = "0.0.0.0:3000";

app.use(cors());
app.use(bodyParser.json());

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/categories', categoryRouter);
app.use('/products', productRouter);
app.use('/orders', orderRouter);

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!');
})

app.listen(3000, function () {
    console.log(`starting app on: ${address}`);
});

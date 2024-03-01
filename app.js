import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import xss from 'xss-clean';
import hpp from 'hpp';
import mongoSanitize from 'express-mongo-sanitize';
import bodyParser from 'body-parser';
import path from 'path';

// ENVIRONMENT variables
import { config } from 'dotenv';
config({
  path: './data/config.env',
});

export const app = express();

// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
// app.use(helmet());
// app.use(mongoSanitize());
// app.use(xss());
app.use(
  cors({
    origin: '*',
  })
);
// app.use(
//   hpp({
//     whitelist: ['category', 'keyword'],
//   })
// );

// import router here
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import orderRouter from './routes/orderRoute.js';
import { errorMiddleware } from './middlewares/ErrorMiddleware.js';

app.use('/api/v1/user', userRouter);
app.use('/api/v1/product', productRouter);
app.use('/api/v1/order', orderRouter);

// STATIC FILES
const __dirname = path.resolve();

console.log(path.join(__dirname, 'react', 'dist'));

app.use(express.static(path.join(__dirname, 'react', 'dist')));

app.get('*', (req, res) => {
  res.send('Hello World');
  res.sendFile(path.join(__dirname, 'react', 'dist', 'index.html'));
});

// Global Error Handler
app.use(errorMiddleware);

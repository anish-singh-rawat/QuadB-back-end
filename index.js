import bodyParser from 'body-parser';
import express from 'express';
import cors from "cors";
import dotenv from 'dotenv'

import { connectToMongoDB } from './config.js';
import router from './routes/AuthRoutes.js';
import ProductRouter from './routes/ProductRoutes.js';
import CartRoute from './routes/CartRoute.js';
import path from 'path';
import { fileURLToPath } from 'url';


dotenv.config()
const app = express()
app.use(bodyParser.json())
app.use(cors());
app.use(express.json())
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/public', express.static(path.join(__dirname, 'public')));

// app.use('/public', express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));
connectToMongoDB();

app.get('/', (req, res) => {
    res.status(200).send({ message: "Welcome to QuadB tech Group API's" });
});

app.listen(process.env.PORT, () => {
    console.log(`E-commerce backend listening at http://localhost:${process.env.PORT}`)
})

app.use('/auth', router);
app.use('/product', ProductRouter);
app.use('/cart', CartRoute);



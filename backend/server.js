import express from 'express';
import data from './src/data.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import seedRouter from "./src/routes/seed.routes.js";
import productRoutes from "./src/routes/product.routes.js";

dotenv.config();

mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log('DB Connected');
}).catch(error => {
    console.log(error.message);
});

const app = express();

app.use('/api/', seedRouter);
app.use('/api/', productRoutes);


const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`server at http://localhost:${port}`);
})
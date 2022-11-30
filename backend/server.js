import express from 'express';
import data from './src/data.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import seedRoutes from "./src/routes/seed.routes.js";
import productRoutes from "./src/routes/product.routes.js";
import userRoutes from "./src/routes/user.routes.js";
import orderRoutes from "./src/routes/order.routes.js";

dotenv.config();

mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log('DB Connected');
}).catch(error => {
    console.log(error.message);
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use('/api/', seedRoutes);
app.use('/api/', productRoutes);
app.use('/api/', userRoutes)
app.use('/api/', orderRoutes)

app.use((error, req, res, next) => {
    res.status(500).send({ message: error.statusMessage })
})

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`server at http://localhost:${port}`);
})
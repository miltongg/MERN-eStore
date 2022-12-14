import {Router} from 'express';
import Product from '../models/product.model.js'
import data from '../data.js';
import User from "../models/user.model.js";

const router = Router();

router.get('/seed', async (req, res) => {
    await Product.deleteMany({})
    const createProducts = await Product.insertMany(data.products);
    await User.deleteMany({})
    const createUsers = await User.insertMany(data.users)
    res.send({ createProducts, createUsers });
});

export default router;
import {Router} from 'express';
import Product from '../models/product.model.js'
import data from '../data.js';

const router = Router();

router.get('/seed', async (req, res) => {
    await Product.remove({})
    const createProducts = await Product.insertMany(data.products);
    res.send({ createProducts });
});

export default router;
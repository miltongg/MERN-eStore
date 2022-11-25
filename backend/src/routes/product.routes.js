import {Router} from 'express';
import Product from '../models/product.model.js'

const router = Router();

router.get('/products', async (req, res) => {
    const products = await Product.find();
    res.send(products);
});

router.get('/products/slug/:slug', async (req, res) => {
    const product = await Product.findOne({slug: req.params.slug});

    if (product) {
        res.send(product)
    } else {
        res.status(404).send({message: "Product not found"})
    }
})

router.get('/products/:id', async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        res.send(product)
    } else {
        res.status(404).send({message: "Product not found"})
    }
})

export default router;
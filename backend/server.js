import express from 'express';
import data from './data.js';

const app = express();


// TEST //
app.get('/api/products', (req, res) => {
    res.send(data.products);
});

app.get('/api/products/slug/:slug', (req, res) => {
    const product = data.products.find(item => item.slug === req.params.slug);

    if (product) {
        res.send(product)
    } else {
        res.status(404).send({message: "Product not found"})
    }
})

app.get('/api/products/:id', (req, res) => {
    const product = data.products.find(item => item._id === req.params.id);

    if (product) {
        res.send(product)
    } else {
        res.status(404).send({message: "Product not found"})
    }
})

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`server at http://localhost:${port}`);
})
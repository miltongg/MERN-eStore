import Product from "../models/product.model.js";

export default async function getProductBySlug(req, res) {

    console.log('headers', req.headers);
    console.log('body', req.body);
    console.log('params', req.params);

    try {
        const product = await Product.findOne({slug: req.params.slug});

        if (product) {
            res.send(product)
        } else {
            res.status(404).send({message: "Product not found"})
        }

    } catch (error) {
        console.error(error.message);
        res.status(500).send({
            message: error.message
        });

    }

}
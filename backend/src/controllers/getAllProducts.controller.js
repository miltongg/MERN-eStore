import Product from "../models/product.model.js";

export default async function getAllProducts(req, res) {

    console.log('headers', req.headers);
    console.log('body', req.body);

    try {
        const products = await Product.find({});

        res.send(products);

    } catch (error) {
        console.error(error.message);
        res.status(500).send({
            message: error.message
        });

    }

}
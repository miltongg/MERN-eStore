import Product from "../models/product.model.js";

export default async function getProductById(req, res) {

    try {
        const product = await Product.findOne({_id: req.params.id});

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
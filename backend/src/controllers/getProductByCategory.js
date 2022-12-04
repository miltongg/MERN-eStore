import Product from '../models/product.model.js'

export default async function getProductByCategory(req, res) {
    
    try {

        const categories = await Product.find().distinct('category');

        res.send(categories);
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send({message: error.message});
    }

}
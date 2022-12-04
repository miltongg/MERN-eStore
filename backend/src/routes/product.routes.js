import {Router} from 'express';
import getAllProducts from "../controllers/getAllProducts.controller.js";
import getProductBySlug from "../controllers/getProductBySlug.controller.js";
import getProductById from "../controllers/getProductById.controller.js";
import getProductByCategory from '../controllers/getProductByCategory.js';
import Product from '../models/product.model.js';

const router = Router();

router.get('/products', getAllProducts);

const PAGE_SIZE = 3
router.get('/products/search', async (req, res) => {
    const { query } = req

    const pageSize = query.pageSize || PAGE_SIZE;
    const page = query.page || 1;
    const category = query.category || '';
    const brand = query.brand || '';
    const price = query.price || '';
    const rating = query.rating || '';
    const order = query.order || '';
    const searchQuery = query.query || '';

    const queryFilter = searchQuery && searchQuery !== 'all' ?
        {
            name: {
                $regex: searchQuery,
                $option: 'i'
            }
        } : {};
    const categoryFilter = category && category !== 'all' ? { category } : {};
    const ratingFilter = rating && rating !== 'all' ? 
        { 
            rating: {
                $gte: Number(rating)
            }
        } : {};
    const priceFilter = price && price !== 'all' ?
        { // 1-50
            price: {
                $gte: Number(price.split('-')[0]),
                $lte: Number(price.split('-')[1])
            }
        } : {};

    const sortOrder =
        order === 'featured' ?
            {featured: - 1} :
            order === 'lowest' ?
            {price: 1} :
            order === 'highest' ?
            {price: - 1} :
            order === 'toprated' ?
            {rating: - 1} :
            order === 'newest' ?
            {createdAt: - 1} :
            { _id: -1 };
    
    const products = await Product.find({
        ...queryFilter, 
        ...categoryFilter, 
        ...priceFilter, 
        ...ratingFilter
    })
        .skip(pageSize * (page - 1))
        .limit(pageSize)
        .sort(sortOrder)

    const countProducts = await Product.countDocuments({
        ...queryFilter,
        ...categoryFilter,
        ...priceFilter,
        ...ratingFilter
    })

    res.send({
        products,
        countProducts,
        page,
        pages: Math.ceil(countProducts / pageSize)
    })
    

})

router.get('/products/categories', getProductByCategory)

router.get('/products/slug/:slug', getProductBySlug);

router.get('/products/:id', getProductById);

export default router;
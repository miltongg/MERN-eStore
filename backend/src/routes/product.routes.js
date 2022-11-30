import {Router} from 'express';
import Product from '../models/product.model.js'
import getAllProducts from "../controllers/getAllProducts.controller.js";
import getProductBySlug from "../controllers/getProductBySlug.controller.js";
import getProductById from "../controllers/getProductById.controller.js";

const router = Router();

router.get('/products', getAllProducts);

router.get('/products/slug/:slug', getProductBySlug);

router.get('/products/:id', getProductById);

export default router;
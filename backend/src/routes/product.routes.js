import {Router} from 'express';
import getAllProducts from "../controllers/getAllProducts.controller.js";
import getProductBySlug from "../controllers/getProductBySlug.controller.js";
import getProductById from "../controllers/getProductById.controller.js";
import getProductByCategoryController from '../controllers/getProductByCategory.controller.js';
import searchProduct from "../controllers/searchProduct.controller.js";


const router = Router();

router.get('/products', getAllProducts);

router.get('/products/search', searchProduct)

router.get('/products/categories', getProductByCategoryController)

router.get('/products/slug/:slug', getProductBySlug);

router.get('/products/:id', getProductById);

export default router;
import {Router} from 'express';
import { isAuth } from '../utils.js';
import createOrder from "../controllers/createOrder.controller.js";
import getOrderById from "../controllers/getOrderById.controller.js";

const router = Router();


router.post('/orders', isAuth, createOrder);

router.get('/orders/:id', isAuth, getOrderById);

export default router;
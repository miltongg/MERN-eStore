import {Router} from 'express';
import { isAuth } from '../utils.js';
import createOrder from "../controllers/createOrder.controller.js";
import getOrderById from "../controllers/getOrderById.controller.js";
import payOrder from "../controllers/payOrder.controller.js";

const router = Router();


router.post('/orders', isAuth, createOrder);

router.get('/orders/:id', isAuth, getOrderById);

router.put('/orders/:id/pay', isAuth, payOrder)

export default router;
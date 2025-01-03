import express from 'express';
import { createOrder, getUserOrders } from '../controllers/order.controller.js';
import { auth } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.use(auth);

router.post('/order', createOrder);
router.get('/orders', getUserOrders);

export default router;
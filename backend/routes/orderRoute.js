import express from 'express';
import { placeOrder, placeOrderStripe, verifyStripe, userOrders, allOrders, updateStatus } from '../controllers/orderController.js';
import authUser from '../middleware/auth.js';

const orderRouter = express.Router();

orderRouter.post('/place',      authUser, placeOrder);
orderRouter.post('/stripe',     authUser, placeOrderStripe);
orderRouter.post('/verifyStripe', authUser, verifyStripe);
orderRouter.post('/userorders', authUser, userOrders);
orderRouter.post('/list',       allOrders);
orderRouter.post('/status',     updateStatus);

export default orderRouter;

import express from 'express';
import asyncHandler from 'express-async-handler';
import protect from '../Middleware/AuthMiddleware.js';
import Order from '../Models/OrderModel.js';

const orderRouter = express.Router();

orderRouter.post('/', protect, asyncHandler(async (req, res) => {
    const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;

    if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error('Nie ma zamówień');
    } else {
        const order = new Order({
            orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice
        });

        const createdOrder = await order.save();

        res.status(201).json(createdOrder);
    }
}));

export default orderRouter;
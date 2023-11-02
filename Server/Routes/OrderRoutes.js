import express from "express";
import asyncHandler from "express-async-handler";
import protect from "../Middleware/AuthMiddleware.js";
import Order from "../Models/OrderModel.js";

const orderRouter = express.Router();

//create order route
orderRouter.post(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    if (orderItems && orderItems.length === 0) {
      res.status(400);
      throw new Error("Nie ma zamówień");
    } else {
      const order = new Order({
        orderItems,
        user: req.user._id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      });

      const createdOrder = await order.save();

      res.status(201).json(createdOrder);
    }
  })
);

// get order by id 
orderRouter.get("/:id", protect, asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate("user", "name surname email")

  if (order) {
    res.json(order)
  } else {
    res.status(404)
    throw new Error("Nie znaleziono zamówienia")
  }

}))


// order is paid 
orderRouter.put("/:id/pay", protect, asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.isPaid = true
    order.paidAt = Date.now()
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address
    }

    const updatedOrder = await order.save()

    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error("Nie znaleziono zamówienia")
  }
}))

// get logged in user orders
orderRouter.get("/", protect, asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 }) // -1 means descending order (newest first)
  
  res.json(orders)
}))

export default orderRouter;

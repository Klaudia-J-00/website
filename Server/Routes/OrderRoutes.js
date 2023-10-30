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


export default orderRouter;

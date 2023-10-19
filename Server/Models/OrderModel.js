import mongoose from "mongoose"

const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "User"
    },
    orderItems: [{
        title: { type: String, required: true},
        qty: { type: Number, required: true}, 
        image_src: { type: String, required: true},
        price: { type: Number, required: true }, 
        product: {
            type: mongoose.Schema.Types.ObjectId,
            required: true, 
            ref: "Product",
        }
    }
    ], 
    shippingAdress: { 
        address: { type: String, required: true },
        city: { type: String, required: true }, 
        postalCode: { type: String, required: true }, 
    },
    paymentMethod: {
        type: String, 
        required: true,
        default: "Paypal"
    },
    shippingPrice: {
        type: Number, 
        required: true, 
        default: 0.0
    },
    totalPrice: {
        type: Number,
        required: true, 
        default: 0.0,
    }
},
{
    timestamps:true,
})

const Order = mongoose.model("Order", orderSchema)

export default Order
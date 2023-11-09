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
            type: mongoose.Schema.Types.Mixed,
            required: true, 
            ref: "Product",
        },
        baseColor: { type: Array, required: false },
        insideBaseColor: { type: Array, required: false },
        keyColor: { type: Array, required: false },
        keyOtherColor: { type: Array, required: false },
        keyThirdColor: { type: Array, required: false },
    }
    ], 
    shippingAddress: { 
        address: { type: String, required: true },
        city: { type: String, required: true }, 
        postalCode: { type: String, required: true },
        phoneNumber: { type: String, required: true },
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
    },
    isPaid: {
        type: Boolean,
        required: true,
        default: false,
    },
    isDelivered: {
        type: Boolean,
        required: true,
        default: false,
    },
    paidAt: {
        type: Date,
    },
    deliveredAt: {
        type: Date,
    }

},
{
    timestamps:true,
})

const Order = mongoose.model("Order", orderSchema)

export default Order
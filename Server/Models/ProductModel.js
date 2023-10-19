import mongoose from "mongoose"

const productSchema = mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    description: {
        type:String,
        require:true,
    },
    price: {
        type:Number,
        require:true,
        default:0 
    },
    color:{
        type:Array,
        require:true, 
    },
    type:{
        type:String,
        require:true, 
    },
    upvote_count:{
        type:Number,
        require:true, 
        default:0 
    },
    downvote_count:{
        type:Number,
        require:true, 
        default:0 
    },
    image_src: {
        type:String,
        require:true
    },
    image_src2: {
        type:String,
        require:true
    },
    image_src3: {
        type:String,
        require:true
    }

},
{
    timestamps:true,
})

const Product = mongoose.model("Product", productSchema)

export default Product
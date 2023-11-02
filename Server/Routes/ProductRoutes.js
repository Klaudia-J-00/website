import express from 'express'
import asyncHandler from 'express-async-handler'
import Product from '../Models/ProductModel.js'

const productRoute = express.Router()

//get all products
productRoute.get("/", asyncHandler(
    async(req, res) => {
        const keyword = req.query.keyword ? { 
            title: {
                $regex: req.query.keyword,
                $options: "i"
            },
        } : {

        }
        const products = await Product.find({...keyword})
        res.json(products)
    })
)

//get one product
productRoute.get("/:id", asyncHandler(
    async(req, res) => {
        const product = await Product.findById(req.params.id)
        if (product) {
            res.json(product)
        } else {
            res.status(404)
            throw new Error("Product not Found")
        }
    })
)

export default productRoute
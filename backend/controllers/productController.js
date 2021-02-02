import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

//@desc     Fetch all products
//@route    GET /api/products
//@access   public
const getProducts = asyncHandler(async(req,res) => {
    const products = await Product.find({ user: req.user._id});
    res.json(products) 
})

//@desc     Fetch single product
//@route    GET /api/products/:id
//@access   public
const getProductById = asyncHandler(async(req,res) => {
    const product =await Product.findById(req.params.id)
    if(product){
        const a = product.user.toString()
        const b = req.user._id.toString()
        if(a!==b){
            res.status(401)
            throw new Error('Not Authorised')
        } else{
            res.json(product)
        }
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

export {getProductById,getProducts}
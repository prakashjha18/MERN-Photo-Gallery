import express from 'express'
const router = express.Router()
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
} from '../controllers/productController.js'
import { protect } from '../middleware/authMiddleware.js'

router.route('/').get(protect,getProducts).post(protect,createProduct)
router.route('/:id').get(protect,getProductById).put(protect,updateProduct)


export default router
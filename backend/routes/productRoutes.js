import express from 'express'
const router = express.Router()
import {
  getProducts,
  getProductById,
} from '../controllers/productController.js'
import { protect } from '../middleware/authMiddleware.js'

router.route('/').get(protect,getProducts)
router.route('/:id').get(protect,getProductById)

export default router
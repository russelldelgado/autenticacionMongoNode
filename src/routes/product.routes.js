import {Router} from 'express'
import * as productoControllers from '../controllers/product.controllers'

const router = Router();


router.post('/' , productoControllers.createProduct)

router.get('/' , productoControllers.getProducts)

router.get('/:productId' , productoControllers.getProductsById)

router.put('/:productId' , productoControllers.updateProductsById)

router.delete('/:productId' , productoControllers.deleteProductsById)


export default router; 
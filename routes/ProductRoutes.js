import express from "express";
import { addProductData, addProductImage, deleteProduct, getAllProducts, getProductById, updateProduct } from "../controller/producatController.js";
import productMiddleWare from "../middleware/productMiddleware.js";

const ProductRouter = express.Router()

ProductRouter.get('/getProduct/:id', getProductById)
ProductRouter.get('/AllProduct', getAllProducts)
ProductRouter.post('/addProductImage', productMiddleWare, addProductImage)
ProductRouter.post('/addProductData', productMiddleWare, addProductData)
ProductRouter.delete('/deleteProduct/:id', productMiddleWare,deleteProduct)
ProductRouter.put('/updateProduct/:id',productMiddleWare, updateProduct)

export default ProductRouter
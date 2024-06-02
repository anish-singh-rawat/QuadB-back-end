import express from "express";
import { addToCart, deleteCartItem, getCartItem } from "../controller/CartController.js";
import authMiddleWare from "../middleware/AuthMiddleware.js";

const CartRoute = express.Router();


CartRoute.post('/AddCartItem', authMiddleWare, addToCart)
CartRoute.get('/getCartItem/:id',authMiddleWare, getCartItem)
CartRoute.delete('/deleteCartItem', authMiddleWare,  deleteCartItem)


export default CartRoute
import express from "express";
import { placeOrderController } from "../controller/PlaceOrderController.js";
import placeOrderMiddleWare from "../middleware/OrderAuth.js";

const OrderRoute = express.Router()

OrderRoute.post('/placeOrder', placeOrderMiddleWare, placeOrderController)

export default OrderRoute;
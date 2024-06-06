import { OrderModel } from "../models/OrderModal.js";
import mongoose from "mongoose";


export const placeOrderController = async (req, res) => {
    const { ProductId, firstName, userId, lastName, StreetAddress, City, CountryOrRegion, PhoneNumber, EmailAddress } = req.body;
    console.log(req.body)
    if (!ProductId || !firstName || !userId || !lastName || !StreetAddress || !City || !CountryOrRegion || !PhoneNumber || !EmailAddress) {
        return res.status(400).send({ message: "Please provide all required data" });
    }

    if (!mongoose.Types.ObjectId.isValid(ProductId) || !mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).send({ message: 'Invalid Id.' });
    }

    try {
        let cart = await OrderModel.findOne({ userId });
        if (!cart) {
            cart = new OrderModel({
                userId,
                orderedItems: [{ ProductId, firstName, lastName, StreetAddress, City, CountryOrRegion, PhoneNumber, EmailAddress }],
            });
        } else {
            const itemIndex = cart.orderedItems.findIndex(item => item.ProductId.toString() === ProductId);
            if (itemIndex !== -1) {
                return res.status(400).send({ message: "Item already ordered" });
            }
            cart.orderedItems.push({ ProductId, firstName, lastName, StreetAddress, City, CountryOrRegion, PhoneNumber, EmailAddress });
        }

        await cart.save();
        return res.status(200).send({ message: "Item ordered successfully", success: true });
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};
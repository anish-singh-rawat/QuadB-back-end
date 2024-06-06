import { UserCartModel } from "../models/CartModel.js";
import mongoose from "mongoose";

export const getCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(404).send({ message: 'User Id not found.' });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ message: 'Invalid User Id.' });
    }

    const cart = await UserCartModel.findOne({ userId: id });
    if (!cart) {
      return res.status(404).send({ message: 'No data found.' });
    }

    return res.status(200).send({ message: 'Cart found successfully', cart });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};


export const addToCart = async (req, res) => {
  const { productId, price, userId, productImage ,itemName } = req.body;
  if (!productId || !price || !userId || !productImage || !itemName) {
    return res.status(400).send({ message: "Please provide all required data" });
  }

  
  if(!mongoose.Types.ObjectId.isValid(productId) || !mongoose.Types.ObjectId.isValid(userId)){
    return res.status(400).send({ message: 'Invalid Id.' });
  }

  try {
    let cart = await UserCartModel.findOne({ userId });
    if (!cart) {
      cart = new UserCartModel({
        userId,
        cartItems: [{ productId, price, productImage, itemName }],
      });
    } else {
      const itemIndex = cart.cartItems.findIndex(item => item.productId.toString() === productId);
      if (itemIndex !== -1) {
        return res.status(400).send({ message: "Item already added" });
      }
      cart.cartItems.push({ productId, price,  productImage, itemName });
    }

    await cart.save();
    return res.status(200).send({ message: "Item added successfully", success: true });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};


export const deleteCartItem = async (req, res) => {
    const { userId, productId } = req.body;
    
    if (!userId || !productId) {
      return res.status(400).send({ message: 'Please provide userId and productId.' });
    }

   if(!mongoose.Types.ObjectId.isValid(productId) || !mongoose.Types.ObjectId.isValid(userId)){
      return res.status(400).send({ message: 'Invalid Id.' });
    }
    
    try {
      let cart = await UserCartModel.findOne({ userId });
      if (!cart) {
        return res.status(404).send({ message: 'Cart not found.' });
      }
  
      const itemIndex = cart.cartItems.findIndex(item => item.productId === productId);
      if (itemIndex === -1) {
        return res.status(404).send({ message: 'Item not found in cart.' });
      }
  
      cart.cartItems.splice(itemIndex, 1);
  
      const updatedCart = await cart.save();
    return  res.status(200).send({ message: 'Item removed successfully', cart: updatedCart });
    } catch (error) {
     return res.status(500).send({ error: error.message });
    }
  };
  

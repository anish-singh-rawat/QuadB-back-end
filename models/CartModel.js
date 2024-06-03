import mongoose from 'mongoose';

const CartItemSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true
  },
  price: {
    type: Number, 
    required: true
  },
  itemName : {
    type: String,
  },
  productImage : {
    type: String,
  }
});

const UserCartSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true
  },
  cartItems: [CartItemSchema] 
});

export const UserCartModel = mongoose.model('UserCart', UserCartSchema);

import mongoose from 'mongoose';

const placeOrderSchema = new mongoose.Schema({
    firstName : {
    type: String,
  },
  lastName: {
    type: String, 
  },
  StreetAddress : {
    type: String,
  },
  City : {
    type: String,
  },
  CountryOrRegion : {
    type: String,
  },
  PhoneNumber: {
    type: String, 
  },
  EmailAddress : {
    type: String,
  },
  ProductId : {
    type: String,
  },
});

const OrderItemSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true
  },
  orderedItems: [placeOrderSchema] 
});

export const OrderModel = mongoose.model('OrderItemSchema', OrderItemSchema);

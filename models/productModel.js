import mongoose from "mongoose"
const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  filename: { type: String },
  imagePath: { type: String },
  originalname: { type: String }
});

const ProductModel = mongoose.model('Product', ProductSchema);
export default ProductModel;
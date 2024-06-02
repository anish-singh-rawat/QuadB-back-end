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
  image : String,
  imagePath: { type: String }
});

const ProductModel = mongoose.model('Product', ProductSchema);
export default ProductModel;
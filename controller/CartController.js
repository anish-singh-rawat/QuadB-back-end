import { UserCartModel } from "../models/CartModel.js";

export const getCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(404).send({ message: 'User Id not found.' });

    const cart = await UserCartModel.findOne({ userId: id });
    if (!cart) return res.status(404).send({ message: 'no data found.' });

    res.status(200).send({ message: 'Cart found successfully', cart });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// export const addToCart = async (req, res) => {
//   const { productId, price, userId } = req.body;
//   if (!productId || !price || !userId) {
//     return res.status(400).send({ message: "Please provide all required data" });
//   }
//   try {
//     let cart = await UserCartModel.findOne({ userId });
//     if (!cart) {
//       cart = new UserCartModel({
//         userId,
//         cartItems: [{ productId, price }] 
//       });
//     } else {
//       const itemdata = await UserCartModel.findOne({ productId })
//       if(itemdata){
//         return res.status(400).send({ message: "item already added" });
//       }
//       cart.cartItems.push({ productId, price }); 
//       await cart.save();
//       return res.status(200).send({ message: "Item added successfully", success : true  });
//     }
//   } catch (error) {
//     return res.status(500).send({ error: error.message });
//   }
// };


export const addToCart = async (req, res) => {
  const { productId, price, userId } = req.body;
  if (!productId || !price || !userId) {
    return res.status(400).send({ message: "Please provide all required data" });
  }

  try {
    let cart = await UserCartModel.findOne({ userId });
    if (!cart) {
      cart = new UserCartModel({
        userId,
        cartItems: [{ productId, price }],
      });
    } else {
      const itemIndex = cart.cartItems.findIndex(item => item.productId.toString() === productId);
      if (itemIndex !== -1) {
        return res.status(400).send({ message: "Item already added" });
      }
      cart.cartItems.push({ productId, price });
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
      res.status(200).send({ message: 'Item removed successfully', cart: updatedCart });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  };
  

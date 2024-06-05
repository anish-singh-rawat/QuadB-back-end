import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const secret = process.env.JWTKEY;

const placeOrderMiddleWare = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).send({ message: "no token found please provide token" });
    }

    const decoded = jwt.verify(token, secret);
    req.body._id = decoded?.id;

    if (req.body._id === decoded?.id) {
      return next();
    }
    else{
        return res.status(401).send({ message: "access denied please login first!" });
    }
  } catch (error) {
    console.log(error);
    return res.status(401).send({ message: "access denied" });
  }
};

export default placeOrderMiddleWare;

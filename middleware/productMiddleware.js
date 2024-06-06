import jwt, { decode } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const secret = process.env.JWTKEY;

const productMiddleWare = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).send({ message: "access denied" });
    }

    try {
      const decoded = jwt.verify(token, secret);
      req.body._id = decoded?.id;

      if (req.body._id === decoded?.id && decoded.admin === true) {
        return next();
      } else {
        return res.status(403).send({ message: "Access denied: Insufficient permissions" });
      }
    } catch (err) {
      return res.status(401).send({ message: "Access denied: Invalid token" });
    }
  } catch (error) {
    console.log(error);
    return res.status(401).send({ message: "access denied" });
  }
};

export default productMiddleWare;

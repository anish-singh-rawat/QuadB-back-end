import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const secret = process.env.JWTKEY;

const authMiddleWare = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).send({ message: "access denied", test : 1 });
    }

    const decoded = jwt.verify(token, secret);
    req.body._id = decoded?.id;

    if (req.body._id === decoded?.id) {
      return next();
    }

    return res.status(401).send({ message: "access denied", test : 2 });

  } catch (error) {
    console.log(error);
    return res.status(401).send({ message: "access denied", test : 3 });
  }
};

export default authMiddleWare;

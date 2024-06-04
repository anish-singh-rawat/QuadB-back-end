import UserModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Cookies from "js-cookie"

// Register new user
export const registerUser = async (req, res) => {
  const { username, email, password, mobile } = req.body;
  if (!username || !email, !password || !mobile) {
    return res.status(402).json({ message: "Please provide all data" });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(req.body.password, salt);
  req.body.password = hashedPass
  const newUser = new UserModel(req.body);
  try {
    const existUser = await UserModel.findOne({ email });
    if (existUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const user = await newUser.save();
    const token = jwt.sign({ email: user.email, admin : user.isAdmin, username: user.username, id: user._id }, process.env.JWTKEY);
    Cookies.set('token', token)
    return res.status(200).json({ user, token, message: "user register successfully", success: true });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Login User
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(403).json({ message: "please provide all data" });
  }
  try {
    const user = await UserModel.findOne({ email: email });
    if (user) {
      const validity = await bcrypt.compare(password, user.password);
      if (!validity) {
        return res.status(401).json({ message: "wrong password" });
      } else {
        const token = jwt.sign({  username: user.username, admin : user.isAdmin, email: user.email, id: user._id }, process.env.JWTKEY);
        Cookies.set('token', token)
        return res.status(200).json({ user, token, message: "user login successfully", success: true });
      }
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    return res.status(500).json(err);
  }
};

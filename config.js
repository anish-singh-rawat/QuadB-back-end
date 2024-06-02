import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config()
export const connectToMongoDB = async () => {
    try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('Successfully connected');
    } catch (error) {
        console.log(error);
    }
}


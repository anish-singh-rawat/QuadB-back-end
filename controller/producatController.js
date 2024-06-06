import ProductModel from "../models/productModel.js";
import multer from 'multer';
import path from 'path';
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config()

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });
export const addProductImage = async (req, res) => {
    upload.single('photo')(req, res, async function (err) {
        const imagePath = `${process.env.API_URL}${req.file.path}`
        const filename = req.file.filename;
        const originalname = req.file.originalname;
        if (err) {
            return res.status(500).send({ message: 'Error uploading file', error: err });
        }
        else {
            return res.status(200).send({ message: "Product image uploaded successfully", imagePath: imagePath, filename: filename, originalname: originalname });
        }
    });
};

export const addProductData = async (req, res) => {
    const { name, description, price, quantity, imagePath, filename, originalname, category, brand } = req.body;
    if (!name || !description || !price || !quantity || !brand || !category || !imagePath) {
        return res.status(400).send({ message: "Please provide all details" });
    }

    const product = new ProductModel({
        name,
        description,
        price,
        quantity,
        imagePath,
        filename,
        originalname,
        category,
        brand
    });

    try {
        await product.save();
        return res.status(200).send({ product, success: true, message: "Product added successfully" });
    } catch (saveError) {
        return res.status(500).send({ message: 'Error saving product', error: saveError });
    }
}

export const getProductById = async (req, res) => {
    if (!req.params.id) {
        return res.status(404).send({ message: "please provide ID" })
    }
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).send({ message: 'Invalid Id.' });
    }
    try {
        const product = await ProductModel.findById(req.params.id);
        if (!product) return res.status(404).send({ success: true, message: 'Product not found.' });
        return res.status(200).send({ product });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }

};

export const getAllProducts = async (req, res) => {
    const products = await ProductModel.find();
    res.status(200).send({ products, success: true });
};

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, quantity, category, brand } = req.body;
        if (!id) {
            return res.status(400).send({ message: "Please provide an ID" });
        }
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({ message: 'Invalid Id.' });
        }

        const product = await ProductModel.findByIdAndUpdate(
            id,
            { name, description, price, quantity, brand, category },
            { new: true, runValidators: true }
        );

        if (!product) {
            return res.status(404).send({ message: 'Product not found.' });
        }

        res.status(200).send({ success: true, message: "Product updated successfully" });
    } catch (error) {
        res.status(500).send({ message: error });
    }
};

export const deleteProduct = async (req, res) => {
    console.log(req.params.id, "product id")
    if (!req.params.id) {
        return res.status(404).send({ message: "please provide ID" })
    }
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).send({ message: 'Invalid Id.' });
    }
    try {
        const product = await ProductModel.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).send({ message: 'Product not found.' });
        return res.status(200).send({ success: true, messsage: 'Product deleted successfully', product });
    } catch (error) {
        return res.status(500).send({ message: error.message })
    }
};

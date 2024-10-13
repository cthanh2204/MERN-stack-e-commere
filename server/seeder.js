import mongoose from "mongoose";
import dotenv from "dotenv";
import users from "./product/user.js";
import products from "./product/product.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createUsers = await User.insertMany(users);
    const adminUser = createUsers[0];

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    await Product.insertMany(sampleProducts);
    console.log("Sample Products: ", sampleProducts); // Check if products contain invalid IDs or other data

    console.log("Data imported");
    process.exit();
  } catch (error) {
    console.log("Error: " + error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log("Data imported");
    process.exit();
  } catch (error) {
    console.log("Error: " + error);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}

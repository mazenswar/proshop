import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import users from './data/users.js';
import products from './data/products.js';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
import connectDB from './config/db.js';


dotenv.config();
connectDB();

async function importData() {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        const createdUsers = await User.insertMany(users);
        const adminUser = createdUsers[0]._id;
        const sampleProducts = products.map(p => {
            return {...p, user: adminUser }
        })
        await Product.insertMany(sampleProducts)
        console.log('Data Imported'.green.inverse);
        process.exit();
    } catch(err) {
        console.log("HERE")
        console.log(`Error: ${err}`);
        process.exit(1);
    }
}


async function destroyData() {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();
        console.log('Data Destroyed'.green.inverse);
        process.exit()
    } catch(err) {
        console.error(`Error ${err}`.red.invese);
        process.exit(1);
    }
}


if(process.argv[2] === '-d') {
    destroyData();
} else {
    importData()
}
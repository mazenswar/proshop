import mongoose from 'mongoose';

async function connectDB() {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false
        })
        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
    } catch(err) {
        console.log(`Error: ${err.message}`.red.underline);
        process.exit(1);
    }
}

export default connectDB
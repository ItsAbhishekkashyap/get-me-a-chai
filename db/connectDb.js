import mongoose from "mongoose";
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(`mongodb://localhost:27017/`,{
            useNewUrlParser: true,
        });
        console.log(`MongoDB Connected: {localhost}`);
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}

export default connectDB;
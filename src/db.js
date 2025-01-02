import mongoose from 'mongoose';

let isConnected = false;

const connectDB = async () => {
    if (!isConnected) {
        try {
            const db = await mongoose.connect(process.env.MONGO_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            isConnected = true;
            console.log('Database connected:', db.connection.name);
        } catch (error) {
            console.error('Database connection error:', error);
        }
    }
};

export default connectDB;

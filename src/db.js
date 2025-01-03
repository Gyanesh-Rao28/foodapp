import mongoose from "mongoose";

const connectDB = async () => {
  try {
    if (mongoose.connections[0].readyState) {
      console.log("Using existing database connection");
      return;
    }

    const connection = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Database connected:", connection.connection.name);
    return connection;
  } catch (error) {
    console.error("Database connection error:", error);
    throw error;
  }
};

export default connectDB;

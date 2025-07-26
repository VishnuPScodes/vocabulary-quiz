import mongoose from "mongoose";

const connectToMongoDB = async () => {
  const mongoURL = process.env.MONGODB_URI as string;
  if (!mongoURL) {
    throw new Error("MONGODB_URI is not defined in environment variables");
  }
  if (mongoose.connection.readyState === 1) {
    console.log("Already connected to MongoDB");
    return;
  }
  try {
    await mongoose.connect(mongoURL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error; // Re-throw the error to handle it in the calling context
  }
};

export default connectToMongoDB;

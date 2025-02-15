import mongoose from "mongoose";

export async function mongooseConnect() {
  try {
    if (mongoose.connection.readyState === 1) {
      return mongoose.connection.asPromise();
    }
    const uri = process.env.MONGODB_URI;
    console.log("Attempting to connect to MongoDB...");
    return await mongoose.connect(uri);
  } catch (error) {
    console.error("MongoDB Connection Error Details:", {
      name: error.name,
      message: error.message,
      code: error.code,
    });
    throw error;
  }
}

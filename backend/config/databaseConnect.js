import mongoose from "mongoose";

const connectDB = async (URI) => {
  try {
    await mongoose.connect(URI);
    console.log("Connected to Database");
  } catch (error) {
    console.log("Error: ", error);
  }
};

export { connectDB }
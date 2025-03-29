import mongoose from "mongoose";

const dbURI = process.env.MONGODB_URI || "";
const connectDB = async function() {
  try {
    await mongoose.connect(dbURI);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};

export default connectDB;

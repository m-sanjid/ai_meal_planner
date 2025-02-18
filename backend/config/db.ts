import mongoose from "mongoose";

const dbURI = process.env.MONGODB_URI || "";
const connectDB = async function() {
  try {
    await mongoose.connect(dbURI);
    console.log("db connected");
  } catch (e) {
    console.log("error while connecting to db", e);
    process.exit(1);
  }
};

export default connectDB;

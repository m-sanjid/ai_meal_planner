import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    name: { type: String },
  },
  { timestamps: true },
);
export default mongoose.model("User", userSchema);

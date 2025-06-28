import type { Request, Response } from "express";
import User from "../models/user.js";

export const registerUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { userId, email, name } = req.body;

    if (!userId || !email) {
      res.status(400).json({ error: "userId and email are required" });
      return;
    }

    // First check if user exists by userId
    let user = await User.findOne({ userId });
    if (user) {
      res.status(200).json({ message: "User already exists", user });
      return;
    }

    // Check if email is already taken by another user
    const existingUserWithEmail = await User.findOne({ email });
    if (existingUserWithEmail) {
      res.status(409).json({ 
        error: "Email already registered with another account",
        code: "EMAIL_TAKEN"
      });
      return;
    }

    // Create new user
    user = new User({ userId, email, name });
    await user.save();

    res.status(201).json({ message: "User registered successfully", user });
    return;
  } catch (error: any) {
    console.error("Error registering user:", error);
    
    // Handle MongoDB duplicate key errors
    if (error.code === 11000) {
      if (error.keyPattern?.email) {
        res.status(409).json({ 
          error: "Email already registered with another account",
          code: "EMAIL_TAKEN"
        });
        return;
      }
      if (error.keyPattern?.userId) {
        res.status(409).json({ 
          error: "User ID already exists",
          code: "USER_ID_TAKEN"
        });
        return;
      }
    }
    
    res.status(500).json({ error: "Failed to register user." });
    return;
  }
};

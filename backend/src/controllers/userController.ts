import type { Request, Response } from "express";
import User from "../models/user.js";

export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId, email, name } = req.body;
    console.log("Register user request:", { userId, email, name });

    if (!userId || !email) {
      console.log("Missing required fields:", { userId, email });
      res.status(400).json({ error: "userId and email are required" });
      return;
    }

    // First check if user exists by userId
    let user = await User.findOne({ userId });
    if (user) {
      console.log("User already exists by userId:", userId);
      res.status(200).json({ message: "User already exists", user });
      return;
    }

    // Check if email is already taken by another user
    const existingUserWithEmail = await User.findOne({ email });
    if (existingUserWithEmail) {
      console.log("Email already taken by user:", existingUserWithEmail.userId);
      // Return the existing user data instead of error
      res.status(200).json({ 
        message: "Email already registered", 
        user: existingUserWithEmail,
        existingAccount: true
      });
      return;
    }

    // Create new user with free plan and 10 tokens
    console.log("Creating new user:", { userId, email, name });
    user = new User({
      userId,
      email,
      name,
      tokens: 10, // Free users get 10 tokens
      subscription: "free",
      subscriptionStatus: "active",
    });
    await user.save();
    console.log("User created successfully:", user._id);

    res.status(201).json({ message: "User registered successfully", user });
    return;
  } catch (error: any) {
    console.error("Error registering user:", error);

    // Handle MongoDB duplicate key errors
    if (error.code === 11000) {
      if (error.keyPattern?.email) {
        res.status(409).json({
          error: "Email already registered with another account",
          code: "EMAIL_TAKEN",
        });
        return;
      }
      if (error.keyPattern?.userId) {
        res.status(409).json({
          error: "User ID already exists",
          code: "USER_ID_TAKEN",
        });
        return;
      }
    }

    res.status(500).json({ error: "Failed to register user." });
    return;
  }
};

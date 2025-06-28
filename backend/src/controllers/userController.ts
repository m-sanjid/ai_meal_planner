import type { Request, Response } from "express";
import User from "../models/user";

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

    let user = await User.findOne({ userId });
    if (user) {
      res.status(200).json({ message: "User already exists", user });
      return;
    }

    user = new User({ userId, email, name });
    await user.save();

    res.status(201).json({ message: "User registered successfully", user });
    return;
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Failed to register user." });
    return;
  }
};

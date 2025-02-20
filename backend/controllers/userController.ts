import type { Request, Response } from "express";
import User from "../models/user";

export const registerUser = async (
  req: Request,
  res: Response,
): Promise<Response | void> => {
  try {
    const { userId, email, name } = req.body;

    let user = await User.findOne({ userId });
    if (user) {
      return res.status(200).json({ message: "User already exists", user });
    }

    user = new User({ userId, email, name });
    await user.save();

    return res
      .status(201)
      .json({ message: "User registered successfully", user });
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({ error: "Failed to register user." });
  }
};

import type { Request, Response, NextFunction } from "express";
import { getAuth } from "@clerk/express";

interface AuthenticatedRequest extends Request {
  user?: { userId: string };
}

export const requireAuth = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Extract Clerk user ID
    const { userId } = getAuth(req);

    if (!userId) {
      return res
        .status(401)
        .json({ error: "Unauthorized. No valid Clerk authentication found." });
    }

    req.user = { userId };

    next();
  } catch (error) {
    console.error("Authentication Error:", error);
    res.status(401).json({ error: "Unauthorized request." });
  }
};

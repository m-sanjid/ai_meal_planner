import type { Request, Response, NextFunction } from "express";
import { getAuth } from "@clerk/express";

export interface AuthenticatedRequest extends Request {
  user?: { userId: string };
}

export const requireAuth = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { userId } = getAuth(req);
    console.log(userId);
    if (!userId) {
      res
        .status(401)
        .json({ error: "Unauthorized. No valid Clerk authentication found." });
      return;
    }
    req.user = { userId };
    next();
  } catch (error) {
    console.error("Authentication Error:", error);
    res.status(401).json({ error: "Unauthorized request." });
  }
};

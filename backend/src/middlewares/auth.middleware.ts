import type { Request, Response, NextFunction } from "express";
import type {} from "express-serve-static-core";
import jwt from "jsonwebtoken";

interface JwtPayload {
  userId: string;
}

declare module "express-serve-static-core" {
  interface Request {
    userId?: string;
  }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.token;

  if (!token) {
    res.status(401).json({ message: "Authorization cookie is required" });
    return;
  }

  const secret = process.env.JWT_SECRET;

  if (!secret) {
    res.status(500).json({ message: "JWT secret is not configured" });
    return;
  }

  try {
    const payload = jwt.verify(token, secret) as JwtPayload;

    req.userId = payload.userId;
    next();
  } catch {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

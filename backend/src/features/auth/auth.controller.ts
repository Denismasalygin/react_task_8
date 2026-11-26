import type { Request, Response } from "express";
import { login, signup } from "./auth.service";

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

export const signupController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "Email and password are required" });
      return;
    }

    if (typeof email !== "string" || typeof password !== "string") {
      res.status(400).json({ message: "Invalid input" });
      return;
    }

    if (password.length < 8) {
      res.status(400).json({
        message: "Password must be at least 8 characters",
      });
      return;
    }

    const result = await signup(email.trim().toLowerCase(), password);

    res.cookie("token", result.token, COOKIE_OPTIONS);
    res.status(201).json({ user: result.user });
  } catch (error) {
    if (error instanceof Error && error.message === "EMAIL_ALREADY_EXISTS") {
      res.status(409).json({ message: "Email is already registered" });
      return;
    }

    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const loginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "Email and password are required" });
      return;
    }

    if (typeof email !== "string" || typeof password !== "string") {
      res.status(400).json({ message: "Invalid input" });
      return;
    }

    const result = await login(email.trim().toLowerCase(), password);

    res.cookie("token", result.token, COOKIE_OPTIONS);
    res.status(200).json({ user: result.user });
  } catch (error) {
    if (error instanceof Error && error.message === "INVALID_CREDENTIALS") {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logoutController = (_req: Request, res: Response) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  res.status(200).json({ message: "Logged out successfully" });
};

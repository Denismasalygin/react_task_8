import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./features/auth/auth.routes";
import { authMiddleware } from "./middlewares/auth.middleware";
import { prisma } from "./lib/prisma";

const app = express();
const PORT = 3001;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.get("/api/auth/me", authMiddleware, async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.userId },
    select: {
      id: true,
      email: true,
      role: true,
      profile: {
        select: {
          first_name: true,
          last_name: true,
          full_name: true,
          avatar: true,
        },
      },
    },
  });

  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  res.json({ user });
});

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Backend is running on http://localhost:${PORT}`);
});

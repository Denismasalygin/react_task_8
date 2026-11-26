import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../../lib/prisma";

const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not configured");
  }

  return secret;
};

export const signup = async (email: string, password: string) => {
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error("EMAIL_ALREADY_EXISTS");
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      email,
      password_hash: passwordHash,
    },
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

  const token = jwt.sign({ userId: user.id }, getJwtSecret(), {
    expiresIn: "7d",
  });

  return { user, token };
};

export const login = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
    include: { profile: true },
  });

  if (!user || !user.password_hash) {
    throw new Error("INVALID_CREDENTIALS");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password_hash);

  if (!isPasswordValid) {
    throw new Error("INVALID_CREDENTIALS");
  }

  const token = jwt.sign({ userId: user.id }, getJwtSecret(), {
    expiresIn: "7d",
  });

  return {
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
      profile: user.profile
        ? {
            first_name: user.profile.first_name,
            last_name: user.profile.last_name,
            full_name: user.profile.full_name,
            avatar: user.profile.avatar,
          }
        : null,
    },
    token,
  };
};

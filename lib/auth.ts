import { cookies } from "next/headers";
import { prisma } from "./prisma";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export interface User {
  id: string;
  email: string;
  name: string | null;
}

export interface JwtPayload {
  userId: string;
  email: string;
  iat?: number;
  exp?: number;
}

const JWT_SECRET =
  process.env.JWT_SECRET ||
  "your-super-secret-jwt-key-change-in-production-must-be-at-least-32-characters-long";
const JWT_EXPIRES_IN = "30d"; // 30 days

// Validate JWT_SECRET exists
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET environment variable is required");
}

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12;
  return await bcrypt.hash(password, saltRounds);
}

export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}

export async function createSession(
  userId: string,
  email: string
): Promise<string> {
  const payload: JwtPayload = {
    userId,
    email,
  };

  const token = jwt.sign(payload, JWT_SECRET!, { expiresIn: JWT_EXPIRES_IN });

  return token;
}

export async function getSession(): Promise<{ user: User } | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("session")?.value;

    if (!token) {
      return null;
    }

    const decoded = jwt.verify(token, JWT_SECRET!) as JwtPayload;

    // Get user from database to ensure user still exists
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });

    if (!user) {
      return null;
    }

    return { user };
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function setSessionCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set("session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    path: "/",
  });
}

export async function deleteSessionCookie() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("session");
  } catch (error) {
    console.error("Error deleting session cookie:", error);
  }
}

export async function createUser(
  email: string,
  password: string,
  name?: string
): Promise<User> {
  const hashedPassword = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
    select: {
      id: true,
      email: true,
      name: true,
    },
  });

  return user;
}

export async function authenticateUser(
  email: string,
  password: string
): Promise<User | null> {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return null;
  }

  const isValidPassword = await verifyPassword(password, user.password);

  if (!isValidPassword) {
    return null;
  }

  return {
    id: user.id,
    email: user.email,
    name: user.name,
  };
}

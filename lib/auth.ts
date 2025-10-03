import { cookies } from "next/headers"
import { prisma } from "./prisma"
import crypto from "crypto"

export interface User {
  id: string
  email: string
  name: string | null
}

export async function hashPassword(password: string): Promise<string> {
  return crypto.createHash("sha256").update(password).digest("hex")
}

export async function createSession(userId: string): Promise<string> {
  const token = crypto.randomBytes(32).toString("hex")
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days

  await prisma.session.create({
    data: {
      userId,
      token,
      expiresAt,
    },
  })

  return token
}

export async function getSession(): Promise<{ user: User } | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get("session")?.value

  if (!token) {
    return null
  }

  const session = await prisma.session.findUnique({
    where: { token },
    include: { user: true },
  })

  if (!session || session.expiresAt < new Date()) {
    if (session) {
      await prisma.session.delete({ where: { id: session.id } })
    }
    return null
  }

  return {
    user: {
      id: session.user.id,
      email: session.user.email,
      name: session.user.name,
    },
  }
}

export async function setSessionCookie(token: string) {
  const cookieStore = await cookies()
  cookieStore.set("session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    path: "/",
  })
}

export async function deleteSession() {
  const cookieStore = await cookies()
  const token = cookieStore.get("session")?.value

  if (token) {
    await prisma.session.deleteMany({ where: { token } })
    cookieStore.delete("session")
  }
}

import { NextRequest, NextResponse } from "next/server";
import { authenticateUser, createSession, setSessionCookie } from "@/lib/auth";
import { loginSchema, formatValidationError } from "@/lib/validations";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input with Zod
    const validation = loginSchema.safeParse(body);
    
    if (!validation.success) {
      return NextResponse.json(
        formatValidationError(validation.error),
        { status: 400 }
      );
    }

    const { email, password } = validation.data;

    // Authenticate user with bcrypt password verification
    const user = await authenticateUser(email, password);

    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Create JWT session
    const token = await createSession(user.id, user.email);
    await setSessionCookie(token);

    return NextResponse.json(
      {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
        message: "Login successful"
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Failed to login" },
      { status: 500 }
    );
  }
}

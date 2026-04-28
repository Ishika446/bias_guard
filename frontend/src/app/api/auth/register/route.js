import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "../../../lib/mongodb";
import User from "../../../models/User";

export async function POST(request) {
  try {
    const { name, email, password } = await request.json();

    // ── Validate inputs ──────────────────────────────────────────────────
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email, and password are required." },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters." },
        { status: 400 }
      );
    }

    // ── Connect to MongoDB ───────────────────────────────────────────────
    await connectDB();

    // ── Check for existing user ──────────────────────────────────────────
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return NextResponse.json(
        { error: "An account with this email already exists." },
        { status: 409 }
      );
    }

    // ── Hash password & save ─────────────────────────────────────────────
    const hashed = await bcrypt.hash(password, 12);
    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashed,
    });

    return NextResponse.json(
      { message: "Account created successfully.", userId: user._id.toString() },
      { status: 201 }
    );
  } catch (err) {
    console.error("[register]", err);
    return NextResponse.json(
      { error: "Internal server error. Please try again." },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Use a single Prisma client instance to avoid multiple connections
const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET || 'myjwtsecretkey';

// if (!JWT_SECRET) {
//   throw new Error('JWT_SECRET is not defined in the environment variables.');
// }

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true, username: true, email: true, password: true, role: true }, // Include role
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 400 }
      );
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 400 }
      );
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET!, { expiresIn: '1h' });

    // Optionally set the token in an HTTP-only cookie for better security
    const response = NextResponse.json({
      message: "Login successful",
      token, // You can remove this if using HTTP-only cookie
      role: user.role,
    });

    // Set token in HTTP-only cookie (secure, httpOnly, sameSite)
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600, // 1 hour in seconds
    });

    return response;
  } catch (error: any) {
    console.error('Error during login:', error);
    return NextResponse.json({ error: "An error occurred. Please try again later." }, { status: 500 });
  }
}

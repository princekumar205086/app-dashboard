import { NextRequest, NextResponse } from 'next/server';

export async function get(req: NextRequest) {
  return NextResponse.json({ message: "Hello World" });
}
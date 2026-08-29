import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest): Promise<NextResponse> {
  // TODO: list loans (filtered by user or all for admin)
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  // TODO: create loan (checkout)
}

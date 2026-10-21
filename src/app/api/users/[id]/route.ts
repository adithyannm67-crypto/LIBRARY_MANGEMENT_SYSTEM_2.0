
import { NextRequest, NextResponse } from 'next/server';

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(
  request: NextRequest,
  { params }: RouteContext
): Promise<NextResponse> {
  const { id } = await params;

  // TODO: get user by id
  return NextResponse.json({ message: 'Get user by id', id });
}

export async function PUT(
  request: NextRequest,
  { params }: RouteContext
): Promise<NextResponse> {
  const { id } = await params;

  // TODO: update user
  return NextResponse.json({ message: 'Update user', id });
}

export async function DELETE(
  request: NextRequest,
  { params }: RouteContext
): Promise<NextResponse> {
  const { id } = await params;

  // TODO: delete user (admin)
  return NextResponse.json({ message: 'Delete user', id });
}

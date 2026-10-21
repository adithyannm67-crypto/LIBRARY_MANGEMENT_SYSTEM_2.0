
import { NextRequest, NextResponse } from 'next/server';

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(
  request: NextRequest,
  { params }: RouteContext
): Promise<NextResponse> {
  const { id } = await params;

  // TODO: get loan by id
  return NextResponse.json({ message: 'Get loan by id', id });
}

export async function PUT(
  request: NextRequest,
  { params }: RouteContext
): Promise<NextResponse> {
  const { id } = await params;

  // TODO: update loan (return, extend)
  return NextResponse.json({ message: 'Update loan', id });
}

export async function DELETE(
  request: NextRequest,
  { params }: RouteContext
): Promise<NextResponse> {
  const { id } = await params;

  // TODO: cancel loan (admin)
  return NextResponse.json({ message: 'Cancel loan', id });
}

import { NextRequest, NextResponse } from 'next/server';

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(
  request: NextRequest,
  { params }: RouteContext
): Promise<NextResponse> {
  const { id } = await params;

  // TODO: get book by id
  return NextResponse.json({ message: 'Get book by id', id });
}

export async function PUT(
  request: NextRequest,
  { params }: RouteContext
): Promise<NextResponse> {
  const { id } = await params;

  // TODO: update book (admin)
  return NextResponse.json({ message: 'Update book', id });
}

export async function DELETE(
  request: NextRequest,
  { params }: RouteContext
): Promise<NextResponse> {
  const { id } = await params;

  // TODO: delete book (admin)
  return NextResponse.json({ message: 'Delete book', id });
}
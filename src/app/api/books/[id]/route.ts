import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { id: string } }): Promise<NextResponse> {
  // TODO: get book by id
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }): Promise<NextResponse> {
  // TODO: update book (admin)
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }): Promise<NextResponse> {
  // TODO: delete book (admin)
}

import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { id: string } }): Promise<NextResponse> {
  // TODO: get loan by id
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }): Promise<NextResponse> {
  // TODO: update loan (return, extend)
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }): Promise<NextResponse> {
  // TODO: cancel loan (admin)
}

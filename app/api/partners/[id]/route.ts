import { NextRequest, NextResponse } from 'next/server';
import { getPartner, updatePartner, deletePartner } from '@/lib/db';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const partner = await getPartner(id);
  if (!partner) {
    return NextResponse.json({ error: 'Partner not found' }, { status: 404 });
  }
  return NextResponse.json(partner);
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const partner = await getPartner(id);
  if (!partner) {
    return NextResponse.json({ error: 'Partner not found' }, { status: 404 });
  }
  const body = await req.json();
  const updated = await updatePartner(id, body);
  return NextResponse.json(updated);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const partner = await getPartner(id);
  if (!partner) {
    return NextResponse.json({ error: 'Partner not found' }, { status: 404 });
  }
  await deletePartner(id);
  return NextResponse.json({ success: true });
}
